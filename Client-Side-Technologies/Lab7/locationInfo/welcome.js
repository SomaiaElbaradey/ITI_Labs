document.getElementById("my-h1").innerText = "Welcome " + localStorage.getItem("job") + " "
    + localStorage.getItem("userName") + "!";
document.getElementById("my-para").innerHTML = "<span> address: " + localStorage.getItem("address")
    + "<br><span> gender: " + localStorage.getItem("gender") + "<br><span> email: " + localStorage.getItem("mail") +
    "<br><span> mobile-number: " + localStorage.getItem("mobile");
