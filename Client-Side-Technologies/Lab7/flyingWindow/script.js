var myWindow = window.open("", "", "width=200,height=100");
var opened=1;
var down;
var up;

document.getElementById("stop").addEventListener("click", function () {
    //opened = 0;
    myWindow.close()    
})

// do {
//     for (var i = 0; i < window.innerHeight; i++) {
//         myWindow.moveBy(1, 1);
//     } for (var i = 0; i < window.innerHeight; i++) {
//         myWindow.moveBy(-1, -1);
//     }
// } while (open == 1);

// function show() {
//     down = setTimeout(function () {
//         for (var i = 0; i < window.innerHeight; i++) {
//             myWindow.moveBy(1, 1);
//         }
        
//     }, 100);
//     up = setTimeout(function () {
//         for (var i = 0; i < window.innerHeight; i++) {
//             myWindow.moveBy(-1, -1);
//         }
//     }, 100);
// }

setInterval(function() {
    down = setTimeout(function () {
        for (var i = 0; i < window.innerHeight; i++) {
            myWindow.moveBy(1, 1);
        }
    }, 100);
    up = setTimeout(function () {
        for (var i = 0; i < window.innerHeight; i++) {
            myWindow.moveBy(-1, -1);
        }
    }, 100);
    clearTimeout(dowm);
    clearTimeout(up);
}, 1000);

// for(var i=0; i<3; i++){
//     show();
// }

///modify ASCII 
//Flying Window
