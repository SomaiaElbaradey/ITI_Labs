var msg = "An example of a message is the important idea of world peace; people try to spread the idea - or message - of world peace. ";
function msgDisplay() {
    var div = document.createElement('div');
    document.body.appendChild(div);
    var txt = msg.split('');                                 //array=[a,n, ,e...]
    var i = 0;
    (function display(){
        if (i < txt.length) {
            div.innerHTML += txt[i];
            i++;
            setTimeout(display, 150);
        }
    })();
}
msgDisplay();