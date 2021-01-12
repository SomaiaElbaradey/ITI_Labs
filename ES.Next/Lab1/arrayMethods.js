/**********************************************array Methods************************************/

var fruits = ["apple", "strawberry", "banana", "orange", "mango"];

//a. test that every element in the given array is a string
console.log("is every element in array is a string?",
    fruits.every((item) => {
        return (typeof (item) === "string")
    })
)

//b.test that some of array elements starts with "a"
console.log("is some element starts with 'a'?",
    fruits.some((item) => {
        return (item.startsWith('a'))
    })
)

//c. new array filtered from the given array with only elements that starts with "b" or "s"
console.log("elements that starts with 'b' or 's':",
    fruits.filter((item) => {
        return (item.startsWith('s') || item.startsWith('b'))
    })
)

//d. array contains a string declaring that you like the give fruit element
var myFruits = fruits.map((item) => {
    return (`I like ${item}`)
})
console.log("Fruits I Like:", myFruits)

//e.display all elements of the new array from previouse point
console.log("all elements:")

myFruits.forEach(element => {
    console.log(element)
})

console.log(".......................................");