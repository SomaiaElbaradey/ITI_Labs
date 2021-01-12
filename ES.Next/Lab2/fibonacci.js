//a.the parameter passed determines the number of elements displayed from the series.
function* fibonacci(number){
    let no1 = 0, no2 = 1, nextVal;
    for(let i = 0; i < number; i++){
        yield no1;
        nextVal = no1 + no2;
        no1 = no2;
        no2 = nextVal;
    }
    yield 'the end'
}
let x = fibonacci(20)


//b.the parameter passed determines the max number of the displayed series should not exceed its value.
function* maxNo(max){
    let no1 = 0, no2 = 1, nextVal = 0;
    for(let i = 0; nextVal < max; i++){
        yield no1;
        nextVal = no1 + no2;
        no1 = no2;
        no2 = nextVal;
        console.log(nextVal)
    }
    yield 'the end'
}
let y = maxNo(10)

console.log("--------------------------------------------------------------")