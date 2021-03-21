const express = require('express');
const app = express();
const port = 3000;

const API_KEY = 'a0f44b5888d8f94e608f47c1eb5575a4';
const movie_id = '682254';
const myurl = 'https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=' + API_KEY;

// Define endpoint to listen for user's get request
app.get("/", (req, res) => {
  res.send("USC Films");
});

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});



// Other endpoints for movie details, etc
// app.route('/watch/movie/:id').get((req, res) => {})
// app.route('/watch/tv/:id').get((req, res) => {})
// app.route('/mylist').get((req, res) => {})