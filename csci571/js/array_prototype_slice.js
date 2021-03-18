function sum(x, y, z) {
    return x + y + z;
}

let myarr = [0, 1, 2, 3, 4, 5];

// console.log(...myarr)  // spread operator
// console.log(sum(...myarr));

// convert arguments to a list
function convertToList() {
    return Array.prototype.slice.call(arguments);
}

let mylist = convertToList(1, 2, 3);
console.log(mylist);
console.log(typeof (mylist));

/* Arguments and 'rest' */
// This doesn't work:
// const myFunc = () => {
//     console.log(arguments);
// }
// Instead we do:
const myFunc = (...inputs) => {
    console.log('First extra input: ', inputs[0]);
    console.log(inputs);
}
myFunc(1, 'a', 'hi there', 5436, 'cat');