/* Details page code */
const express = require("express");
const axios = require("axios");
let router = express.Router();

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

/* Other endpoints for movie details, etc */
// TODO: figure out how to pass in custom ID for details page
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})

// const url1 =
//   "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
//   API_KEY +
//   "&language=en-US&page=1";
// let curr_movies = axios.get(url1); // this is a Promise

/* Send data to Homepage */
router.get("/", (req, res) => {
  res.send("Movie Details here");
  // axios
  //   .all([
  //     curr_movies
  //   ])
  //   .then(
  //     axios.spread((...responses) => {
  //       const curr_movies2 = responses[0].data["results"]
  //         .slice(0, 5)
  //         .map(({ id, title, poster_path }) => ({ id, title, poster_path }));

  //       // Send everything in one json to the client
  //       res.json({
  //         curr_movies: curr_movies2
  //       });
  //     })
  //   )
  //   .catch((error) => console.log(error));
});

module.exports = router;
