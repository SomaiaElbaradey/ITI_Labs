
//task1
var twoOnly = function(){
    if(arguments.length>2||arguments.length<2){
        throw("the lenght of your number is out of the range")
    }
}
// twoOnly(2,3);
// twoOnly(2,3,5);
// twoOnly(2);

//task2
var sum=0;
var add = function(){
    var len= arguments.length;
    for(i=0; i<len; i++){
        if(isNaN(arguments[i])){
            throw("your number is not valid");
        }
        sum+=arguments[i];
    }
    return sum;
}
// add(1,86,253);
// add(10,200,3,"ss");