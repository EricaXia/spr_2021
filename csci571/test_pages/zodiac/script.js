/* TODO: try customizing the message based on option entered (which zodiac sign was chosen) */

function getInfo() {
  "use strict";

  var text_row_a, random_result, result;

  text_row_a = "Here is your horoscope:";
  document.getElementById("text-row-1").innerHTML = text_row_a;

  random_result = [
    "Today's your lucky day, do something out of the ordinary",
    "Be ready for new challenges",
    "Career opportunities are waiting for you",
    "Wait patiently, one of your wishes will come true",
    "Think positively. The day will surprise you",
    "Stop reading horoscopes!",
  ];

  result = random_result[Math.floor(Math.random() * random_result.length)];
    document.getElementById("text-row-2").innerHTML = result;
    document.getElementById("restart-btn").style.visibility = "visible";
}
