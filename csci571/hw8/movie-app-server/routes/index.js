/* HOMEPAGE code */
const express = require("express");
const axios = require("axios");

// Its more modular to use router to route to the main app.js
let router = express.Router();

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

const url1 =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let curr_movies = axios.get(url1); // this is a Promise

const url2 =
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let popular_movies = axios.get(url2);

const url3 =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let top_rated_movies = axios.get(url3);

const url4 =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;
let trending_movies = axios.get(url4);

const url5 =
  "https://api.themoviedb.org/3/tv/popular?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let popular_tv = axios.get(url5);

const url6 =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let top_rated_tv = axios.get(url6);

const url7 = "https://api.themoviedb.org/3/trending/tv/day?api_key=" + API_KEY;
let trending_tv = axios.get(url7);

/* Send data to Homepage */
router.get("/", (req, res) => {
  axios
    .all([
      curr_movies,
      popular_movies,
      top_rated_movies,
      trending_movies,
      popular_tv,
      top_rated_tv,
      trending_tv,
    ])
    .then(
      axios.spread((...responses) => {
        const curr_movies2 = responses[0].data["results"]
          .slice(0, 5)
          .map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        const popular_movies2 = responses[1].data[
          "results"
        ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        const top_rated_movies2 = responses[2].data[
          "results"
        ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        const trending_movies2 = responses[3].data[
          "results"
        ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        const popular_tv2 = responses[4].data[
          "results"
        ].map(({ id, name, poster_path }) => ({ id, name, poster_path }));
        const top_rated_tv2 = responses[5].data[
          "results"
        ].map(({ id, name, poster_path }) => ({ id, name, poster_path }));
        const trending_tv2 = responses[6].data[
          "results"
        ].map(({ id, name, poster_path }) => ({ id, name, poster_path }));

        // Send everything in one json to the client
        res.json({
          curr_movies: curr_movies2,
          popular_movies: popular_movies2,
          top_rated_movies: top_rated_movies2,
          trending_movies: trending_movies2,
          popular_tv: popular_tv2,
          top_rated_tv: top_rated_tv2,
          trending_tv: trending_tv2,
        });
      })
    )
    .catch((error) => console.log(error));
});

module.exports = router;

/* Other endpoints for movie details, etc */
// TODO: figure out how to pass in custom ID for details page
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})

/* Lower priority: watchlist for 1 pt */
// app.route('/mylist').get((req, res) => {})
