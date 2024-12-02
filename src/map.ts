import "./map.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
fetch("/assets/map/tour.xml")
  .then((response) => response.text())
  .then((text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/xml");
    doc
      .querySelectorAll("wpt")
      .forEach((element) =>
        console.log(element.querySelector("name")?.textContent),
      );
  });

mapboxgl.accessToken = 'pk.eyJ1IjoidGh5bG8iLCJhIjoiY2xmMmV1Y2E4MDFkbTN0bzE3NGg1czIxZCJ9.uJIESMl5p99NTKmSwTcV5Q';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});