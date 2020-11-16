 document.getElementById("number").addEventListener("keypress", function (e) {
    if (isNaN(e.key)) {
        console.log("you entered unvalid value");
        e.preventDefault();
    }
})