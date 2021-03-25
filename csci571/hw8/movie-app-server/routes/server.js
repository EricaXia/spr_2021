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
// Define homepage endpoint to listen for GET request
app.get("/", (req, resp) => {
  /* Currently Playing Movies */
  curr_playing_movies = c.getCurrPlayingMovies();
  curr_playing_movies
    .then((result) => {
      let first_five = result.data["results"]
        .slice(0, 5)
        .map(({ id, title, poster_path }) => ({ id, title, poster_path }));
      // console.log(first_five);
      resp.send(first_five);
    })
    .catch((error) => console.log(error));

  /* Continue Watching */
  // TODO: implement watch list using localstorage

  /* Popular Movies */
  popular_movies = c.getPopularMovies();
  popular_movies
    .then((result) => {
      let popular_list = result.data[
        "results"
      ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
      // console.log(popular_list);
      // resp.send(popular_list); // 20 movies
    })
    .catch((error) => console.log(error));

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
