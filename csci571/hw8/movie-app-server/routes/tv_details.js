/* TV details page code */
const express = require("express");
const axios = require("axios");
let tvDetailsRouter = express.Router({ mergeParams: true });

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

/* Send data to details page*/
tvDetailsRouter.get("/", (req, res) => {
  const tv_id = req.params.tv_id;
  // E.g. go to http://localhost:3000/watch/tv/32726 to see Bobs burgers
  const url =
    "https://api.themoviedb.org/3/tv/" +
    tv_id +
    "?api_key=" +
    API_KEY +
    "&language=en-US&";
  axios
    .get(url)
    .then((resp) => {
      let tv_data = resp.data;
      res.send(tv_data);
    })
    .catch((error) => console.log(error));
});

module.exports = tvDetailsRouter;
