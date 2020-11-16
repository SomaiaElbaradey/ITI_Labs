var ascii = document.getElementById("myASCII");
ascii.addEventListener("keydown", function (event) {
    //var res = ascii.value.charCodeAt(0);
    var res = event.which;
    var capital = event.getModifierState('CapsLock');
    //console.log(event.altKey)
    switch (res) {
        case 18:
            alert("you enterd alt")
            break;
        case 17:
            alert("you enterd control key")
            break;
        case 16:
            alert("you enterd shift key")
            break;
        case 20:
            alert("the ASCII of the entered value: CapitalK is " + 20)
            break;
        default:
            if (capital) {
                alert("the ASCII of the entered value: " + event.key + " is " + event.which);
            } else {
                alert("the ASCII of the entered value: " + event.key + " is " + eval(event.which + 32));
            }
    }
    console.log()
    ascii.value = '';
})

//keycode, kEY
