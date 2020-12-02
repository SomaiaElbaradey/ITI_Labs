document.getElementById("name").style.color = getCookie("color");
document.getElementById("name").innerText = getCookie("userName");
var date = new Date(2021, 11, 11);
var x;
if (getCookie("gender") == "female") {
    document.getElementById("image").src = "./pic/2.png";
} else {
    document.getElementById("image").src = "./pic/1.png";
}
//counter
x = getCookie("count");
x++;
setCookie("count", x, date);
document.getElementById("number").innerText = x;