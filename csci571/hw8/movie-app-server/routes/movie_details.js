/* Details page code */
const express = require("express");
const axios = require("axios");
let movieDetailsRouter = express.Router({ mergeParams: true });

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";


/* Send data to details page*/
movieDetailsRouter.get("/", (req, res) => {
  const movie_id = req.params.movie_id;
  // res.send("You clicked on movie with id " + movie_id);

  // E.g. Go to http://localhost:3000/watch/movie/10625 to see details for the movie mean girls;
  const url = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY + "&language=en-US&";
  axios.get(url).then((resp) => {
    let movie_data = resp.data;
    res.send(movie_data);
  })
    .catch((error) => console.log(error));
});

module.exports = movieDetailsRouter;
