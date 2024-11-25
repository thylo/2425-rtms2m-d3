import "./style.scss";
import * as d3 from "d3";
import { DSVParsedArray } from "d3";

interface Pokemon {
  id: string;
  name: string;
  attack: number;
  defense: number;
  type_1: string;
  type_2: string;
  hp: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  legendary: boolean;
  generation: number;
}

const width = document.body.clientWidth;
const height = document.body.clientHeight;
const padding = 60;

function createTooltip() {
  // create a tooltip
  return d3.select("#app").append("div").attr("class", "tooltip");
}

function initGraph(pokemons: DSVParsedArray<Pokemon>) {
  const svg = d3.select(".js-svg").attr("width", width).attr("height", height);

  const tooltip = createTooltip();

  const distinctTypes = Array.from(new Set(pokemons.map((d) => d.type_1)));

  const warmColorLinearScale = d3.scaleLinear(
    [0, distinctTypes.length - 1],
    [0, 1],
  );
  const warmColors = distinctTypes.map((_, i) =>
    d3.interpolateTurbo(warmColorLinearScale(i)),
  );

  const colorScale = d3.scaleOrdinal(distinctTypes, warmColors);

  const minHpValue = d3.min(pokemons, (d) => d.hp) as number;
  const maxHpValue = d3.max(pokemons, (d) => d.hp) as number;
  const xScale = d3.scaleLinear(
    [minHpValue, maxHpValue],
    [0, width - 2 * padding],
  );

  const minAtkValue = d3.min(pokemons, (d) => d.attack) as number;
  const maxAtkValue = d3.max(pokemons, (d) => d.attack) as number;
  const yScale = d3.scaleLinear(
    [minAtkValue, maxAtkValue],
    [0, height - 2 * padding],
  );

  const minDefenseValue = d3.min(pokemons, (d) => d.defense) as number;
  const maxDefenseValue = d3.max(pokemons, (d) => d.defense) as number;
  const radiusScale = d3.scaleLinear(
    [minDefenseValue, maxDefenseValue],
    [2, 20],
  );

  svg
    .append("g")
    .attr("class", "axis")
    .style("transform", `translate(${padding}px,${height - padding}px)`)
    .call(d3.axisBottom(xScale));

  svg
    .append("g")
    .attr("class", "axis")
    .style("transform", `translate(${padding}px,${padding}px)`)
    .call(d3.axisLeft(yScale));

  const circles = svg
    .append("g")
    .classed("circles", true)
    .style("transform", `translate(${padding}px,${padding}px)`)
    .selectAll<SVGCircleElement, Pokemon>("circle")
    .data(pokemons, d=>d.id);

  circles
    .join('circle')
    .classed("circle", true)
    .attr("r", (d) => radiusScale(d.defense))
    .attr("fill", (d: Pokemon) => colorScale(d.type_1))
    .style("transform", (datum) => {
      return `translate(${xScale(datum.hp)}px,${yScale(datum.attack)}px)`;
    })
    .on("mouseover", (event, d) => {
      tooltip.classed("visible", true).html(d.name);
      d3.select(event.currentTarget).classed("selected", true);
    })
    .on("mousemove", (event) => {
      tooltip.style("--offsetX", `${event.clientX}px`);
      tooltip.style("--offsetY", `${event.clientY}px`);
    })
    .on("mouseleave", (event) => {
      tooltip.classed("visible", false);
      tooltip.style("--offsetX", `${event.clientX}px`);
      tooltip.style("--offsetY", `${event.clientY}px`);
      d3.select(event.currentTarget).classed("selected", false);
    });

  d3.select("body")
    .append("ul")
    .attr("class", "legend")
    .selectAll<HTMLLIElement, string>("li")
    .data(distinctTypes, (d)=>d)
    .join("li")
    .text((d) => d)
    .style("--typeColor", (d) => colorScale(d));
}

d3.text("/pokemon.csv")
  .then((txt: string) => d3.csvParse<Pokemon, string>(txt, d3.autoType))
  .then((value) => {
    console.log("received", value);
    initGraph(value);
  });
