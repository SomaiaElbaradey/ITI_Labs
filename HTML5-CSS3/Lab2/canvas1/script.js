var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var color = document.getElementById("color");
document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault();
    // console.log(color.value)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle=color.value;
    for(var i=0; i<93; i++)
    {
        ctx.beginPath();
        ctx.arc(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height),40,0,2*Math.PI);
        ctx.stroke();
    }
})

