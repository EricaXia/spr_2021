const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

let movie_id = "791373";

const getMovieDetails = (movie_id) => {
  const myurl =
    "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;
  try {
    return axios.get(myurl);
  } catch (error) {
    console.error(error);
  }
};

const getCurrPlayingMovies = () => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
    API_KEY +
    "&language=en-US&page=1";
  try {
    return axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const getPopularMovies = () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=" +
    API_KEY +
    "&language=en-US&page=1";
  try {
    return axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

/* HOMEPAGE code */
// Define homepage endpoint to listen for GET request
app.get("/", (req, resp) => {
  /* Currently Playing Movies */
  curr_playing_movies = getCurrPlayingMovies();
  curr_playing_movies
    .then((result) => {
      let first_five = result.data["results"]
        .slice(0, 5)
        .map(({ id, title, poster_path }) => ({ id, title, poster_path }));
      // resp.send(first_five);
    })
    .catch((error) => console.log(error));

  /* Continue Watching */
  // TODO: implement watch list using localstorage

  /* Popular Movies */
  popular_movies = getPopularMovies();
  popular_movies
    .then((result) => {
      let popular_list = result.data["results"]
        .map(({ id, title, poster_path }) => ({ id, title, poster_path }));
      // resp.send(popular_list); // 20 movies
    })
    .catch((error) => console.log(error));
  
  /* Top Rated Movies */

  /* Trending Movies */

  /* Popular TV Shows */

  /* Top Rated TV Shows */

  /* Trending TV Shows */

  // let movie = getMovieDetails(movie_id);
  // movie
  //   .then((result) => resp.send(result.data))
  //   .catch((error) => console.log(error));
});

// app.get("/aboutme", (req, res) => {
//   res.send(
//     "Welcome to my secret test page -\nMy favorite foods:\n\n🍕 Pizza\n 🍫 Chocolate\n 🍠 Yams"
//   );
// });

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});

// Other endpoints for movie details, etc
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})
// app.route('/mylist').get((req, res) => {})
