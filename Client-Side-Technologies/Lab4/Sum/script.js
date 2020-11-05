var sum = 0;
const regNo = new RegExp('^[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]$');
do {
    var n = prompt("please enter your number:");
    n = parseInt(n);
    console.log(n);
    if (isNaN(n)) {
        alert("the sum of your numbers is:" + sum);
    }
    sum += n;
} while (regNo.test(n));
alert("the sum of your numbers is:" + sum);