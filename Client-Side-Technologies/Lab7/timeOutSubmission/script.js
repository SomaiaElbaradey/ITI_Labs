var myForm = document.getElementsByTagName("form")[0];
var inputs = document.getElementsByTagName("input");
var username;
var age;
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    username= inputs[0].value;
    age= inputs[1].value;
    document.getElementById("userData").innerText="the user name is: "+ username
    + "  and the user age is: "+ age;
})
inputs[0].addEventListener("keypress",function(e){
    if(!isNaN(e.key)){
        console.log("you entered unvalid value");
        e.preventDefault();
    }
})
inputs[1].addEventListener("keypress",function(e){
    if(isNaN(e.key)){
        console.log("you entered unvalid value");
        e.preventDefault();
    }
})
if (inputs[0].value == '' || inputs[1].value == '') {
    setTimeout(function () {
        alert("Time Out! you didn't enter the data!");
    }, 30000)
}