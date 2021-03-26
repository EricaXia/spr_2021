const axios = require("axios");

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

// Mean Girls
let movie_id = 10625;
const url = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY + "&language=en-US&";
let movies_details = axios.get(url); // this is a Promise



// const tvurl = "https://api.themoviedb.org/3/tv/:tvid?api_key=<<api_key>>&language=en-US&"