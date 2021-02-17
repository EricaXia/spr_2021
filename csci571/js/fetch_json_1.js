const fetch = require('node-fetch');

let DATA = "https://bytes.usc.edu/~saty/sampledata/GeoJSON/cats.geojson";

async function fetchData() {
  const response = await fetch(DATA);

  for (let [key, value] of response.headers) {
    console.log(`${key} = ${value}`);
  }

  let gd = await response.text();
  return gd;
}

fetchData().then(
    d=>console.log(d)
);
