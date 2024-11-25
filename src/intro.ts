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

function initGraph(pokemons: DSVParsedArray<Pokemon>) {
  const svg = d3.select(".js-svg").attr("width", width).attr("height", height);

}

d3.text("/pokemon.csv")
    .then((txt: string) => d3.csvParse<Pokemon, string>(txt, d3.autoType))
    .then((value) => {
      console.log("received", value);
      initGraph(value);
    });
