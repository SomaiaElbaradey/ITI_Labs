var img = document.getElementById("header").children[0];
var newImg = img.cloneNode(true);
img.addEventListener("click", function () {
    //styling the images
    img.style.position = "absolute";
    img.style.display = "block";
    img.style.right = "0%";
    img.style.top = "0%";
    newImg.style.position = "absolute";
    newImg.style.display = "block";
    newImg.style.left = "0%";
    newImg.style.bottom = "0%";
    //append 
    document.getElementById("header").appendChild(newImg);
    //modify the list
    var list = document.getElementById("navigation");
    list.style.position = "absolute";
    list.style.marginTop = "300";
    list.style.marginLeft = "50%";
    list.style.marginRight = "50%";
    document.getElementById("nav").style.listStyleType = "circle";
})

