let person = '{"name": "Erica", "age": 24, "city": "New York"}';
let myjsonobject = JSON.parse(person);
document.getElementById("myelement").innerHTML =
  "My name is " +
  myjsonobject.name +
  " and I am " +
  myjsonobject.age +
  " years old.";
