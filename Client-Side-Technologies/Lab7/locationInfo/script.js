var gender;
function myFunction(val){
    gender=val;
}
inputs=document.getElementsByTagName("input");
document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
    e.preventDefault();
    localStorage.setItem("userName", inputs[0].value);
    localStorage.setItem("password",inputs[1].value);
    localStorage.setItem("mail",inputs[2].value);
    localStorage.setItem("mobile",inputs[3].value);
    localStorage.setItem("job",inputs[4].value);
    localStorage.setItem("address",inputs[5].value);
    localStorage.setItem("gender",gender);
    location.replace("file:///D:/ITI/ITI_Labs/Client-Side-Technologies/Lab7/locationInfo/welcome.html");
})
// console.log(document.getElementsByTagName("input")[0].required);
