const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

const API_KEY = "a0f44b5888d8f94e608f47c1eb5575a4";
let movie_id = "682254";
const myurl =
  "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + API_KEY;

const getMovieData = () => {
  try {
    return axios.get(myurl);
  } catch (error) {
    console.error(error);
  }
};

// const logMovieData = async () => {
//   const m = getMovieData()
//     .then((response) => {
//       if (response.data.message) {
//         console.log(`${Object.entries(response.data.message).length}`);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// logMovieData();

// Define homepage endpoint to listen for GET request
app.get("/", (req, res) => {
  let movie = getMovieData();
  movie
    .then(
      //   (result) => console.log("This is the result:\n", result.data)
      (result) => res.send(result.data)
    )
    .catch((error) => console.log(error));

  // res.send("test");
});

app.get("/aboutme", (req, res) => {
  res.send(
    "Welcome to my secret test page -\nMy favorite foods:\n\n🍕 Pizza\n 🍫 Chocolate\n 🍠 Yams"
  );
});

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});

// Other endpoints for movie details, etc
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})
// app.route('/mylist').get((req, res) => {})
