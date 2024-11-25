import "./style.scss";
import * as d3 from "d3";
import { Root } from "./app";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
const padding = 60;

function initGraph(data: Root) {
  const svg = d3.select(".js-svg").attr("width", width).attr("height", height);
  console.log(data)
  /*
  d3.select("#app")
    .classed("map", true)
    .append("div")
    .classed("container", true)
    .selectAll("div")
    .data(data.features)
    .enter()
    .append("div")
    .text((d) => d.properties.arr_name_fr.join(","));
   */
}

d3.json<Root>("/communesgemeente-belgium-7.json").then((data) => {
  if (data) initGraph(data);
});
