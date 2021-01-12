/************************Swap the values of x and y using destructuring**********************/

let x = "one";
let y = "two";

// before swaping
console.log("values before swap, x:", x, "and y:", y);
//swaping
[x, y] = [y, x];
// after swaping
console.log("values after swap, x:", x, "and y:", y);

console.log(".......................................");