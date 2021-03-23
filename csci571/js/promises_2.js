/* Comparing callbacks to promises:
Promises are meant to replace the functionality of callbacks
*/

const likesCats = true;
const likesDogs = true;

function likesPets(callback, errorCallback) {
  console.log("Using callback function: \n");
  if (likesCats && likesDogs) {
    callback("You like both cats and dogs!");
  } else if (likesCats) {
    callback("You like cats~! 🐈");
  } else if (likesDogs) {
    callback("You like dogs!! 🐕‍🦺");
  } else {
    errorCallback({
      name: "User doesn't like either",
      message: "You don't like pets 😢",
    });
  }
}

// call the function with callbacks
likesPets(
  (message) => {
    console.log("Success: " + message + "\n");
  },
  (error) => {
    console.log("Failure: " + error.name + "\n" + error.message + "\n");
  }
);

/* Convert the above callback to promise */
// Define promise function
function likesPetsPromise() {
  return new Promise((resolve, reject) => {
    console.log("Using promise function:\n");
    if (likesCats && likesDogs) {
      resolve("You like both cats and dogs!");
    } else if (likesCats) {
      resolve("You like cats~! 🐈");
    } else if (likesDogs) {
      resolve("You like dogs!! 🐕‍🦺");
    } else {
      reject({
        name: "User doesn't like either",
        message: "You don't like pets 😢",
      });
    }
  });
}

// Call the function with promise
likesPetsPromise()
  .then((message) => {
    console.log("Success: " + message + "\n");
  })
  .catch((error) => {
    console.log("Failure: " + error.name + "\n" + error.message + "\n");
  });

/* Promises help escape the problem of "callback hell" (having deeply nested callbacks) because we can use the .then and .catch syntax instead*/