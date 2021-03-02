function validateInput() {
  var x = document.forms["searchForm"]["keyword"].value;
  var y = document.forms["searchForm"]["category"].value;
  if (x == "") {
    alert("Please enter valid values.");
    return false;
  } else if (y == "") {
    alert("Please enter valid values.");
    return false;
  }
}
