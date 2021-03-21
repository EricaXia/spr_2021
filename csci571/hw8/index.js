const express = require("express");
const axios = require("axios");

/* This Express-Object is essential and used to set up the application itself, add routes and rest-endpoints initialize middleware. */
const app = express();
const port = 3000;

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";
let movie_id = "682254";
const myurl =
  "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;

const getMovieData = () => {
  try {
    return axios.get(myurl);
  } catch (error) {
    console.error(error);
  }
};

let res = getMovieData();

res.then(
    (result) => console.log("This is the result:\n", result.data)
);

// const logMovieData = async () => {
//   const m = getMovieData()
//     .then((response) => {
//       if (response.data.message) {
//         console.log(`${Object.entries(response.data.message).length}`);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// logMovieData();

// Define homepage endpoint to listen for GET request
app.get("/", (req, res) => {
  res.send("USC Films");
});

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});

// Other endpoints for movie details, etc
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})
// app.route('/mylist').get((req, res) => {})
