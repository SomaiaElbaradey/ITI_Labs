var ans = document.getElementById("Answer");
value1=0;
value2=0;
operator='';
function EnterNumber(value){
    var lastVar= ans.value;
    ans.setAttribute("value",value+=lastVar); 
};
function EnterOperator(op){
    value1= parseInt(ans.value);
    operator=op;
    ans.setAttribute("value",''); 
}
function EnterEqual(){
    value2= parseInt(ans.value);
    if (operator=="-"){
        ans.value=value1-value2;
    } else if(operator=="+"){
        ans.value=value1+value2;
    } else if(operator=='*'){
        ans.value=value1*value2;
    } else if(operator=='/'){
        if(value2==0){
            ans.setAttribute("value",'ERROR'); 
        } else{
            ans.value=value1/value2;
        }
    }
}
function EnterClear(){
    ans.setAttribute("value",''); 
}