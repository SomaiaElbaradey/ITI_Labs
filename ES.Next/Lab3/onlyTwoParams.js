// 2. Create a function that accepts only 2 parameters and throw err if number of parameters either less than or exceeds 2 parameters

function onlyTwo(param1, param2) {
    if (arguments.length != 2) {
        throw 'you can not enter more than 2 parameters'
    }
    return `parameter 1 is: ${param1}, parameter 2 is: ${param2}`
}

onlyTwo(19, 1);
onlyTwo(10, 17, 9);
onlyTwo(69);