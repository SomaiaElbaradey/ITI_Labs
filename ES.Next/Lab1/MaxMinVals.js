/************************************rest parameter and spread operator**********************/

function reMax(arr) {
    console.log("your array max value: ", Math.max(...arr));
}

function retMin(arr) {
    console.log("your array min value: ", Math.min(...arr));
}

//define arr with any length
console.log("test array1:");
let arr1 = [2, 5, 8, 1, 0, 19];

reMax(arr1)
retMin(arr1)

console.log("test array2:")
let arr2 = [17, 39, 69, 5];

reMax(arr2)
retMin(arr2)

console.log(".......................................");