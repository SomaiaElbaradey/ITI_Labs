var myWindow = window.open("", "", "width=200,height=100");
document.getElementById("stop").addEventListener("click", function () {
    clearInterval(opened);
    myWindow.close();
})
var opened = setInterval(function(){
    for (var i = 0; i < window.innerHeight; i++) {
        myWindow.moveBy(1, 1);
    } for (var i = 0; i < window.innerHeight; i++) {
        myWindow.moveBy(-1, -1);
    }
}, 500)