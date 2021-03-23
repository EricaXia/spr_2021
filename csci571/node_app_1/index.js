const express = require("express");
const app = express();
const port = 3000;

// Define endpoint to listen for user's get request
app.get("/", (req, res) => {
  res.send("Hello world!! 🕶 😀❤💌🌱🌍");
});

app.listen(port, () => {
  console.log(`My app is listening at http://localhost:${port}`);
});
