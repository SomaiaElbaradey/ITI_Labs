var n = parseInt(prompt("please enter the number of your people"));
var user = new Array();
var age = new Array();
regName = /^[a-zA-Z]{3,10}$/
for (var i = 0; i < n; i++) {
    do {
        var userName = prompt("please enter name of user number" + (i + 1));
        user[i] = userName;
    } while (user[i] == null || !regName.test(user[i]));

    do {
        var userAge = prompt("please enter age of user number" + (i + 1));
        age[i] = userAge;

    } while (age[i] >= 60 || age[i] <= 10 || age[i] == null || age[i] == "" || isNaN(age[i]))
}
for(var i=0;i<n;i++)
{
   document.writeln("user number:"+i+1+" his name is: "+ user[i]+" and his age is: "+age[i]+"...  ");
}