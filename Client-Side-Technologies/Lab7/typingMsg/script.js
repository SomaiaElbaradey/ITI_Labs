document.getElementById("msg").addEventListener("click", function (e) {
    var myWindow = window.open("", "", "width=200,height=100");
    myWindow.document.write(
        "<html><head></head><body>"
        + "<script type='text/javascript' src='child.js'></script>"
        + "</body></html>"
    )
})





