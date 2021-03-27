const axios = require("axios");

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

// // Mean Girls
let movie_id = 10625;
// const url = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY + "&language=en-US&";
// let movies_details = axios.get(url); // this is a Promise

const details_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "?api_key=" +
  API_KEY +
  "&language=en-US&";

let details = axios.get(details_url);

const vid_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "/videos?api_key=" +
  API_KEY +
  "&language=en-US";
let video = axios.get(vid_url);

const cast_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "/credits?api_key=" +
  API_KEY +
  "&language=en-US";
let cast = axios.get(cast_url);

const reviews_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "/reviews?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let reviews = axios.get(reviews_url);

const recs_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "/recommendations?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let recs = axios.get(recs_url);

const sim_url =
  "https://api.themoviedb.org/3/movie/" +
  movie_id +
  "/similar?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
let sim = axios.get(sim_url);

/* TODO: look up from HW requirements to specify which pieces of each JSON (e.g. name, rating, video url, etc) we need to pass to the frontend client. We can use the .map(({attribute_names}) => ({attribute_names})) method */
axios
  .all([details, video, cast, reviews, recs, sim])
  .then(
    axios.spread((...responses) => {
      const details2 = responses[0].data; // add ".map() method to specify which k:v pairs to get"
      // console.log(details2);

      const video2 = responses[1].data;
      // console.log(video2);

      const cast2 = responses[2].data;
      // console.log(cast2);

      //TODO: where to get reviewer user's profile pic?
      const reviews2 = responses[3].data;
      // console.log(reviews2);

      const recs2 = responses[4].data;
      // console.log(recs2);

      const sim2 = responses[5].data;
      console.log(sim2);

      // Send everything in one json to the client
      res.json({
        details: details2,
        video: video2,
        cast: cast2,
        reviews: reviews2,
        recommended: recs2,
        similar: sim2,
      });
    })
  )
  .catch((error) => console.log(error));
