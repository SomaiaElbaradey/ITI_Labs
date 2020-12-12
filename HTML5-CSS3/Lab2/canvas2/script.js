var canvas = document.getElementById("myCanvasImg");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 640;
ctx.canvas.height = 400;
window.onload = function () {
    var img = document.getElementById("img");
    ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, canvas.width, canvas.height);
    // ctx.drawImage(img, 10, 10);
};
setTimeout(() => {
    ctx.font = "19px Comic Sans MS";
    ctx.shadowOffsetX = -4;
    ctx.shadowOffsetY = 4;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 3;
    ctx.fillText("I will never be anything 'til I break away from me", canvas.width - 550, canvas.height - 100);
}, 100);