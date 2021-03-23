const axios = require("axios");

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

module.exports = {
  getMovieDetails: (movie_id) => {
    const myurl =
      "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;
    try {
      return axios.get(myurl);
    } catch (error) {
      console.error(error);
    }
  },

  getCurrPlayingMovies: () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      API_KEY +
      "&language=en-US&page=1";
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },

  getPopularMovies: () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
      API_KEY +
      "&language=en-US&page=1";
    try {
      return axios.get(url);
    } catch (error) {
      console.error(error);
    }
  },
};
