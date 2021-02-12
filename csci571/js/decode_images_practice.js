/* 
JS practice for the tutorial at: https://www.youtube.com/watch?v=Svcz8sj6WzE
*/

let image = getPixelArray(100, 100);  //100x100 pixels blank canvas , represented as an array of numbers
// shape of image is 40,000
// array = [r,b,g,transparent,r,b,g,etc....]
image[0] = 255;  //set red color to be on. the number 255 means to turn the color on.
image[3] = 255;
draw(100, 100, image);

// makes a 100x100 red square
for (let i = 0; i < image.length; i += 4) {
  // set each line to = 255 to turn the color on
  image[i] = 255; //red
  image[i+1] = 0; //green
  image[i+2] = 0; //blue
  image[i+3] = 255; // transparency
}

draw(100, 100, image);


// EXERCISE BELOW
function decodingFunction (pixelArray) {  
  // Edit the pixelArray to find the hidden image!
  // Put your code in here.
  
  for (let i = 0; i < pixelArray.length; i+=4) {
    pixelArray[i] = pixelArray[i] * 3;
    pixelArray[i+1] = 0;
    pixelArray[i+2] = 50;
    pixelArray[i+3] = 255;
  }
  
  
  // When you return something in a function, that give it an output.
  // When we used charCodeAt(), that function returns a number and we can set that to a variable.
  // Here, the helper functions take the modified pixelArray and draw it.
  return pixelArray;
}

// You can change the 1st parameter to be 1, 2, or 3.

// length = 3 million pixels
let secretImage = decodeSecretImage(3, decodingFunction);
