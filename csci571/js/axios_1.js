const axios = require("axios");

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

// let movie_id = 123;
// const movie_details_url =
// "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;

Promise.all([
  curr_movies,
  popular_movies,
  top_rated_movies,
  trending_movies,
  popular_tv,
  top_rated_tv,
  trending_tv,
])
  .then((responses) => {
    // responses.forEach((resp) => {
    //     resp_list = resp.data["results"].map(({ id, title, name, poster_path }) => ({ id, title, name, poster_path }));
    // })
  })
  .then((resp_list) => {
    console.log(resp_list);
  })
  .catch((error) => console.log(error));
