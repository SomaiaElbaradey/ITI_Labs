var body = document.children[0].children[1];
var img= document.getElementById("header").children[0];
var newImg = img.cloneNode(false);
//styling
img.style.position = "absolute"; 
img.style.display = "block";
img.style.width = "25%"; 
img.style.right = "0%"; 
img.style.top = "0%"; 
newImg.style.position = "absolute"; 
newImg.style.display = "block";
newImg.style.left = "0%"; 
newImg.style.top = "0%"; 
//append 
document.getElementById("header").appendChild(newImg);
