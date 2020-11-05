// calculate the area of circle
const numberRgExp = new RegExp('^[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]$');
var r;
do{
    r= prompt("please enter the radious of the circle");
} while (!numberRgExp.test(r));
alert("the area of your circle is:"+ (Math.PI*r*r) );

//calculate the sguare root 
do{
    r= prompt("please enter your number");
} while (!numberRgExp.test(r));
alert("the square root of your number is:"+ (Math.sqrt(r)) );
