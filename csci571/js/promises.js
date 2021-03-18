let p = new Promise((resolve, reject) => {
    let a = 1 + 1; // call success
//   let a = 1 + 2; // call failure
  if (a == 2) {
    resolve("Success");
  } else {
    resolve("Failure");
  }
});

// What to do if the above succeeds or if it fails
p.then((message) => {
  console.log("This is in the then: " + message); // if success
}).catch((message) => {
  console.log("This is in the catch: " + message); // if fail
});

