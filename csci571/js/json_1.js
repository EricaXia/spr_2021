var mystring = '{ "name": "Kat", "age": 24, "city": "Atlanta", "food": "🍕"}';
console.log(mystring);

// convert to JS object type
var myobj = JSON.parse(mystring);
console.log(myobj);
console.log(typeof (myobj));
console.log(myobj['name']);
console.log(myobj['food']);

// convert back to string
var mystring2 = JSON.stringify(myobj);
console.log(mystring2)