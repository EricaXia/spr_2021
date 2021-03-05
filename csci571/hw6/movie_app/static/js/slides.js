var slideIndex = 0;
myslideshow();

function myslideshow() {
  var i;
  var currSlide = document.getElementsByClassName("slide");
  for (i = 0; i < currSlide.length; i++) {
    currSlide[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > currSlide.length) {slideIndex = 1}
  currSlide[slideIndex-1].style.display = "block";
  setTimeout(myslideshow, 4000); 
}