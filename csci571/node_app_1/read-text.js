/* How to read a text file (3 ways) */
// const { readFile, readFileSync } = require("fs");

// Method 1 - readFileSync
// const txt = readFileSync('./hello.txt', 'utf8');
// console.log(txt);
// console.log("I want this done now");

// Method 2 - callback
// readFile("./hello.txt", "utf8", (err, txt) => {
//   console.log(txt);
// });
// console.log("I want this done now"); //runs first

// Method 3 - promises
// const { readFile } = require("fs").promises;
// async function hello() {
//   const file = await readFile("./hello.txt", "utf8");
//   console.log(file);
// }
// hello();
