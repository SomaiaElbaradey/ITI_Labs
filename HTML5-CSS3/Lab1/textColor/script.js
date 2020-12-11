var text = document.getElementById("text");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var red = document.getElementById("red");
red.addEventListener('input', function () {
    text.style.color = 'rgb('+ this.value +','+green.value+','+blue.value+')'
})
blue.addEventListener('input', function () {
    text.style.color = 'rgb('+ red.value +','+green.value+','+this.value+')'
})
green.addEventListener('input', function () {
    text.style.color = 'rgb('+ red.value +','+this.value+','+blue.value+')'
})