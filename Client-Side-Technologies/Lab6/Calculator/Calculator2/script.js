var ans = document.getElementById("Answer");
function EnterNumber(value){
    ans.setAttribute("value",ans.value+value); 
};
function EnterOperator(op){
    ans.setAttribute("value",ans.value+op); 
}
function EnterEqual(){
    ans.setAttribute("value",eval(ans.value)); 
}
function EnterClear(){
    ans.setAttribute("value","");
}