// import "express";
// import "axios";

const express = require("express");
const axios = require("axios");
const c = require("./mycalls");

const port = 3000;
const app = express();

// TODO: Look up why use router.get() for endpoints instead of app.get()?
// var router = express.Router();



/* HOMEPAGE code */
app.get("/", (req, resp) => {
  /* TODO: refactor code so the Promise.all works and we can send all the homepage data in one go */

  // res = c.getCurrPlayingMovies();
  // console.log("this is res");
  // console.log(typeof(res));  // undefined


  // {
  //   Promise.all([
  //     c.getCurrPlayingMovies(),
  //     c.getPopularMovies(),
  //     c.getTopRatedMovies(),
  //   ])
  //     // .then(cons)
  //     .then(
  //       ([curr_playing_movies, popular_movies, toprated_movies]) =>
  //         console.log(curr_playing_movies)
  //       // resp.send({
  //       //   curr_playing_movies,
  //       //   popular_movies,
  //       //   toprated_movies,
  //       // })
  //     )
  //     .catch((error) => console.log(error));
  // }

  /* Currently Playing Movies */
  /* Continue Watching TODO: implement watch list using localstorage */
  /* Popular Movies */
  /* Top Rated Movies */
  /* Trending Movies */
  /* Popular TV Shows */
  /* Top Rated TV Shows */
  /* Trending TV Shows */
});

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});

// Other endpoints for movie details, etc
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})
// app.route('/mylist').get((req, res) => {})
