//task1
do{
    var msg = prompt("please enter your message");
} while(msg==null||msg=='');
for(var i=1; i<=6; i++){
    document.write(`<h${i}> ${msg} <h${i}>`)
}
