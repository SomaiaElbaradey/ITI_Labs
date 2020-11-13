balls = document.getElementsByTagName("img");
coloredMarble = "img/marble2.jpg";
normalMarble = "img/marble1.jpg";
var i = 0;
var time;
function move() {
    time = setInterval(function () {
        if (i > 4) {
            balls[4].src = normalMarble;
            i = 0;
        }
        if (i != 0) {
            balls[i - 1].src = normalMarble;
        }
        balls[i].src = coloredMarble;
        i++;
    }, 1000);
}
move();
function stop() {
    clearInterval(time);
}
function completeMoving() {
    move();
}