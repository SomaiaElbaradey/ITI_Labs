const phoneRegExp = /^[0-9]{8}$/;
const mobileRegExp = /^01[0125][0-9]{8}$/;
const mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const nameRegExp = /^[a-zA-Z_ ]+$/;

var name;
var phoneNo;
var mobileNo;
var mail;

do {
    name = prompt("please enter your name");
    console.log(name)
} while (!(nameRegExp.test(name)) || name == 'null');
do {
    mobileNo = prompt("please enter your mobile number")
} while (!mobileRegExp.test(mobileNo));

do {
    phoneNo = prompt("please enter your phone number")
} while (!phoneRegExp.test(phoneNo));

do {
    mail = prompt("please enter your mail")
} while (!mailRegExp.test(mail));

alert("Wlecome " + name + "... your phone number is: " + phoneNo + " and mobile is: " + mobileNo + " and mail is: " + mail);