import "./style.scss";
import * as d3 from "d3";
import { DSVParsedArray, style } from "d3";

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

const width = 800;
const height = 800;
const padding = 60;

function initGraph(pokemons: DSVParsedArray<Pokemon>) {
  const app = d3.select("#app");

  const doubleAttack = pokemons.map((p)=>({...p, attack: p.attack*2 }))

  const svg = app
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "red")
    .classed("toto", true);

  const circleContainer = svg.append("g");

  const minimumAttack = d3.min(pokemons.map((p) => p.attack)) as number;
  const maximumAttack = d3.max(pokemons.map((p) => p.attack)) as number;
  const attackScale = d3
    .scaleLinear()
    .domain([minimumAttack, maximumAttack])
    .range([5, 30]);

  circleContainer
    .selectAll("circle")
    .data(pokemons)
    .join("circle")
    .attr("r", (d) => attackScale(d.hp))
    .attr("fill", "green")
    .style(
      "transform",
      (d, index) => `translate(${index * 10}px,${d.attack}px)`,
    );
}

d3.text("/pokemon.csv")
  .then((txt: string) => d3.csvParse<Pokemon, string>(txt, d3.autoType))
  .then((value) => {
    console.log("received", value);
    initGraph(value);
  });
