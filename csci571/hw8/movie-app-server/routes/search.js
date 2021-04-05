/* Search function*/
const express = require("express");
const axios = require("axios");
let searchRouter = express.Router({ mergeParams: true });

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";

/* Send data to details page*/
searchRouter.get("/", (req, res) => {
    // const search_id = req.params.search_id;
    const query = req.params.query;
    const url = "https://api.themoviedb.org/3/search/multi?api_key=" + API_KEY + "&language=en-US&page=1&query=" + query;
    axios
        .get(url)
        .then((resp) => {
        let search_data = resp.data.results.map(({ id, name, poster_path }) => ({ id, name, poster_path }));

        for (var i = 0; i < search_data.length; i++) {
            if (search_data[i]["poster_path"]) {
              search_data[i]["img_path"] = "https://image.tmdb.org/t/p/w500" + search_data[i]["poster_path"];
            }
          }

        // console.log(search_data)
        res.send(search_data);
        })
        .catch((error) => console.log(error));
    });

module.exports = searchRouter;
