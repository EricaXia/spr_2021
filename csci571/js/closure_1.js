/* 
A JS "closure" is similar to a class in Python:
Outer function with variables = class instance with properties, 
Inner function(s) = class methods that can change the class properties
*/

function outer() {
    const fish = '🐟';
    let count = 0;

    function inner() {
        count++;
        return `${count} ${fish}`
    }
    return inner
}

const fun = outer();
console.log(fun());
console.log(fun());
console.log(fun());
