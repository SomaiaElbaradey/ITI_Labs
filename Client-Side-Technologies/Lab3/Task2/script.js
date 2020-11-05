
//task 2
do{
    var firstName = prompt("please enter your first name");
} while(firstName==null||firstName=='');
do{
    var lastName = prompt("please enter your last name");
} while(lastName==null||lastName=='');
var fullName=firstName+' '+lastName;
alert(fullName);