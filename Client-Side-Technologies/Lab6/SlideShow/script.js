img = document.getElementById("my-img");
var imgs = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg'];
var i = 0;
var timeInter;
document.getElementById("next").addEventListener("click", function () {
    i += 1;
    if (i > 5) {
        i = 0;
    }
    img.src = imgs[i];
})
document.getElementById("previous").addEventListener("click", function () {
    i -= 1;
    if (i < 0) {
        i = 5;
    }
    img.src = imgs[i];
})
document.getElementById("show").addEventListener("click", function () {
    timeInter = setInterval(function () {
        i += 1;
        if (i > 5) {
            i = 0;
        }
        img.src = imgs[i];
    }, 2000);
})
document.getElementById("stop").addEventListener("click", function () {
    clearInterval(timeInter);
})