var ans = document.getElementById("Answer");
value1=0;
value2=0;
operator='';
function EnterNumber(value){
    var lastVar= ans.value;
    ans.setAttribute("value",lastVar+value); 
};
function EnterOperator(op){
    value1= parseFloat(ans.value);
    operator=op;
    ans.setAttribute("value",''); 
}
function EnterEqual(){
    value2= parseFloat(ans.value);
    if (operator=="-"){
        ans.setAttribute("value",value1-value2);
    } else if(operator=="+"){
        ans.setAttribute("value",value1+value2);
    } else if(operator=='*'){
        ans.setAttribute("value",value1*value2);
    } else if(operator=='/'){
        if(value2==0){
            ans.setAttribute("value",'ERROR'); 
        } else{
            ans.setAttribute("value",value1/value2);
        }
    }
}
function EnterClear(){
    ans.setAttribute("value","");
}