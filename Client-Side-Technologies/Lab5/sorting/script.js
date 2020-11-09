//SORTING asc and desc
var arr = new Array(5);
for(var i=0; i<5; i++){
    arr[i]=prompt("enter your numbers");
    arr[i]=parseInt(arr[i]);
}
var sortedArr= new Array();
for (var i=0; i<5; i++ ){
    sortedArr[i]=arr[i];
}
sortedArr = sortedArr.sort();

console.log("you have entered the values: ");
arr.forEach(function(index){
    console.log(index+", ");
});
 console.log("the values after sorting the array ascading: ");
 sortedArr.forEach(function(index){
    console.log(index+", ");
});
sortedArr= sortedArr.reverse();
console.log("the values after sorting the array descading: ");
sortedArr.forEach(function(index){
   console.log(index+", ");
});

// take any number of paramaters and reverse it 
var reversedArr= new Array();
do{
    var item =prompt("please enter your number and cancel if you finish");
    if(!isNaN(item)&&item!=null){
        reversedArr.push(item);
    } 
} while(item!=null)
reversedArr=reversedArr.reverse();

//function of reversing
var x = function(){
    var arrr= new Array();
    for(var i =0; i<arguments.length; i++){
        arrr[i]=arguments[i];
    }
    return arrr.reverse();
}
console.log(x(2,3,1));