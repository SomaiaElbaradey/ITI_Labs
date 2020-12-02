var userName, age;
var gender;
var date = new Date(2021, 11, 11);
var nameComment = document.getElementById("nameComment");
var ageComment = document.getElementById("ageComment");
var genderComment = document.getElementById("genderComment");
var inputs = document.getElementsByTagName("input");
setCookie("count", 0, date);
function myFunction(val) {
    gender = val;
}
document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
    e.preventDefault();
    var color = document.getElementById("color").value;
    //validate name
    userName = document.forms[0]["userName"].value;
    if (userName == "") {
        nameComment.textContent = "Name is required!";
        return false;
    }
    else if (!isNaN(userName)) {
        nameComment.textContent = "Name is not valid!";
        return false;
    }
    else {
        nameComment.textContent = "";
    }
    //validate age
    age = document.forms[0]["age"].value;
    if (age == "") {
        ageComment.textContent = "age is required!";
        return false;
    }
    else if (isNaN(age)) {
        ageComment.textContent = "age is not valid!";
        return false;
    }
    else {
        ageComment.textContent = "";
    }
    setCookie("userName", inputs[0].value, date);
    setCookie("age", inputs[1].value, date);
    setCookie("gender", gender, date);
    setCookie("color", color, date);

    location.replace("http://127.0.0.1:5500/cookies/child..html");
})
/////////////////////////////////////////////////////////////
console.log(document.cookie);
