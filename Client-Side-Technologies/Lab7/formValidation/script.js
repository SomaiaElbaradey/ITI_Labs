var mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
var userName = document.getElementById("name");
var age = document.getElementById("age");
var mail = document.getElementById("mail");
var table = document.getElementsByTagName("table")[0];
var spans = document.getElementsByTagName("span");
userName.addEventListener("keypress", function (e) {
    if (!isNaN(e.key)) {
        e.preventDefault();
        setTimeout(function () {
            spans[0].innerText = "";
        }, 3000)
        spans[0].innerText = "  you entered unvalid value";
    }
})
age.addEventListener("keypress", function (e) {
    if (isNaN(e.key)) {
        e.preventDefault();
        setTimeout(function () {
            spans[1].innerText = "";
        }, 3000)
        spans[1].innerText = "  you entered unvalid value";
    }
})
document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
    var row = document.createElement("tr");
    e.preventDefault();
    if (userName.value == '') {
        e.preventDefault();
        setTimeout(function () {
            spans[0].innerText = "";
        }, 3000)
        spans[0].innerText = "  this field is reguired";
        //spans[0].innerText = "  this field is reguired";
    }
    if (age.value == '') {
        e.preventDefault();
        setTimeout(function () {
            spans[1].innerText = "";
        }, 3000)
        spans[1].innerText = "  this field is reguired";
        //spans[1].innerText = "  this field is reguired";
    }
    if (!mailRegExp.test(mail.value)) {
        e.preventDefault();
        setTimeout(function () {
            spans[2].innerText = "";
        }, 3000)
        spans[2].innerText = "  this field is reguired";
        //spans[2].innerText = "  this value is unvalid";
    } else {
        row.innerHTML = "<td>" + userName.value + "<td>" + age.value + "<td>" + mail.value + "<td\>";
        table.appendChild(row);
    }
})