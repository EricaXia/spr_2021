function yourName() {
    let text;
    let person = prompt("What is your name?");
    if (person == null || person == "") {
        text = "You didn't enter anything";
    } else {
        text = "Hello, " + person + " !"
    }
    document.getElementById("welcome_msg").innerHTML = text;
}

// alert 
// confirm 
// prompt 
