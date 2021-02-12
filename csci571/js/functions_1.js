// Recursion in JS

// compute exponential power
// Recursively
function pow_recur(x, n) {
    if (n==1) {
        return x;
    } else {
        return x * pow(x, n-1);
    }
}

// calc 2 cubed
// console.log(pow(2, 3));

// Iteratively using for-loop
function pow(x, n) {
    let result = 1;
    for (i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}

// Define inputs
let num1 = 8;
let num2 = 3;
let msg2 = "This is " + num1 + " to the power of " + num2 + ": ";
console.log(msg2);
// console.log(pow(num1, num2));
console.log(pow_recur(num1, num2));