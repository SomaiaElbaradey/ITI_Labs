var body = document.children[0].children[1];
var div = document.getElementById("my-div");

div.addEventListener("click", function () {
    var lastChild = div.cloneNode(true);
    lastChild.style.backgroundColor = "rgb(" + getRandomInt(0, 255) +
        ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ")";
    document.body.appendChild(lastChild);
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}