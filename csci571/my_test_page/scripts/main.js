let messages = [
  "You are worthy of good things.",
  "Every part of you is beautiful.",
  "You are amazing!",
  "You deserve the best.",
  "You are enough.",
  "Everything is going to be OK.",
  "No matter what, you can make the most of today.",
  "You can learn anything you set your mind to.",
  "You will overcome all challenges.",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function showMessage() {
  alert(messages[getRandomInt(messages.length)]);
}
