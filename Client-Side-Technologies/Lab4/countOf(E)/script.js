var count=0;
var str= new String;
str= prompt("enter your sttring");
var len = str.length;
for(var i=0; i<len; i++){
    if(str[i]=='e'||str[i]=='E'){
        count++;
    }
}
alert("your string have "+count+" e letter");