var arr = new Array();
for (var i = 0; i < 3; i++) {
    arr.push(prompt("your numbers are"));
    arr[i] = parseInt(arr[i])
};
var sum = arr[0];
var multi = arr[0];
var div = arr[0];
//add/multi/divide the three elememts
for (var i = 1; i < 3; i++) {
    sum += arr[i];
    multi *= arr[i]; 2
    if (arr[i] == 0) {
        alert("you can't divide on zero!");
        throw "you can't divide on zero!";
    } else {
        div /= arr[i];
    }
};
//show 
alert("sum of the three values: " + arr[0] + "+" + arr[1] + "+" + arr[2] + "=" + sum);
alert("multiply of the three values: " + arr[0] + "*" + arr[1] + "*" + arr[2] + "=" + multi);
alert("division of the three values: " + arr[0] + "/" + arr[1] + "/" + arr[2] + "=" + div);

