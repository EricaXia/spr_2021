// Logic to open the modal itself

var modal = document.getElementById("modal-box");
var btn = document.getElementById("show-more");
var span = document.getElementsByClassName("close")[0];  // close button

// console.log("button loaded");


// call this when Show More button is clicked
function getDetails() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // return details
    }
    else {
      console.log("ready state " + this.readyState);
    }
    req.open("POST", "/", true);
    req.setRequestHeader(
      "content-type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
  
    req.send(
      "item_id=" +
      // TODO: get the movie/show id when show more button is clicked
        // document.getElementById("keyword").value
    );
  }

}
} 


// When the user clicks the button, open the modal
btn.onclick = function () {
  // call function to get the movie/show details
  modal.style.display = "block";
  
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
