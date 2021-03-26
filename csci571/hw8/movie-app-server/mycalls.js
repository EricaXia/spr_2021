const axios = require("axios");

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

module.exports = {
  getCurrPlayingMovies: () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      API_KEY +
      "&language=en-US&page=1";
    axios
      .get(url)
      .then((resp) => {
        const first_five = resp.data["results"]
          .slice(0, 5)
          .map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        return first_five;
      })
      .then((result) => {
        console.log(result);  // This WORKS
        // return result;  //This DOES NOT WORK (returns undefined)
      })

      .catch((error) => console.log(error));
  },

  getPopularMovies: () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
      API_KEY +
      "&language=en-US&page=1";
    axios
      .get(url)
      .then((resp) => {
        const popular_movies_list = resp.data[
          "results"
        ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
        return popular_movies_list;
      })
      .catch((error) => console.log(error));
  },

  getTopRatedMovies: () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
      API_KEY +
      "&language=en-US&page=1";
    try {
      axios
        .get(url)
        .then((resp) => {
          const toprated_movies_list = resp.data[
            "results"
          ].map(({ id, title, poster_path }) => ({ id, title, poster_path }));
          return toprated_movies_list;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  },

  getMovieDetails: (movie_id) => {
    const myurl =
      "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;
    try {
      return axios.get(myurl);
    } catch (error) {
      console.error(error);
    }
  },
};
