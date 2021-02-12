let todays_date = new Date();
document.getElementById("todays_date").innerHTML = todays_date;

let person = {
  name: "Erica",
  age: 24,
  favorite_food: "pizza",
  favorite_drink: "mimosas"
};

let pet = {
  name: "Chloe",
  type: "mixed",
  desc: ["cute", "beautiful", "angelic", "adorable"]
};

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

function changeP() {
  document.getElementById("changep").innerHTML = "Secret message: You're incredible!";
}

function checkAge() {
  let x;
  let text;
  // Get value of input field
  x = document.getElementById("age_entry").value;
  if (x == "") {
    text = "Enter something";
  }
  else if (x == person.age) {
    text = "You are the same age as me";
  }
  else if (x<person.age) {
    text = "You are younger than me";
    }
  else if (x>person.age) {
    text = "You are older than me";
  }
  else {
    text = "Enter a valid age!";
  }
  // Change the text of the <p> element with id="age_text"
  document.getElementById("age_text").innerHTML = text;
}

function checkPet() {
  let x;
  let text;

  x = document.getElementById("pet_entry").value;
  // console.log(x)
  if (x == "") {
    text = "Enter something";
  }
  else if (x == pet.name) {
    text = "Correct!";
  }
  else {
    text = "Sorry, guess again";
  }
  // console.log(text)
  document.getElementById("pet_text").innerHTML = text;
}