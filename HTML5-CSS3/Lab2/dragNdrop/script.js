var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var sciss = document.getElementById("sciss");
// if (window.confirm())
// {
//     location.reload();
// }
// else
// {
//     myWindow.close();
// }
rock.addEventListener("dragstart", function (e) {
    //console.log("start r");
    e.dataTransfer.setData("name", this.id);
})
sciss.addEventListener("dragstart", function (e) {
    // console.log("start s");
    e.dataTransfer.setData("name", this.id);
})
paper.addEventListener("dragstart", function (e) {
    // console.log("start p");
    e.dataTransfer.setData("name", this.id);
})

rock.addEventListener("drop", function (e) {
    // console.log("drop r");
    var val = e.dataTransfer.getData("name");
    if (val == 'paper') {
        this.id = "paper";
        paper.id = "rock";
        var temp = this.innerHTML;
        this.innerHTML = paper.innerHTML;
        paper.innerHTML = temp;
        document.getElementsByTagName('h1')[1].innerText = "Good!"
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
    else {
        document.getElementsByTagName('h1')[1].innerText = "Wrong.."
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
    // rock = document.getElementById("rock");
    // paper = document.getElementById("paper");
    // sciss = document.getElementById("sciss");
})

paper.addEventListener("drop", function (e) {
    // console.log("drop p");
    console.log(e.path[1].getAttribute('data-value'));
    console.log(sciss.getAttribute('data-value'))
    var val = e.dataTransfer.getData("name");
    if (val == 'sciss') {
        this.id = "sciss";
        sciss.id = "paper";
        var temp = this.innerHTML;
        this.innerHTML = sciss.innerHTML;
        sciss.innerHTML = temp;
        document.getElementsByTagName('h1')[1].innerText = "Good!"
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
    else {
        document.getElementsByTagName('h1')[1].innerText = "Wrong.."
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
})

sciss.addEventListener("drop", function (e) {
    // console.log("drop s");
    var val = e.dataTransfer.getData("name");
    if (val == 'rock') {
        this.id = "rock";
        rock.id = "sciss";
        var temp = this.innerHTML;
        this.innerHTML = rock.innerHTML;
        rock.innerHTML = temp;
        document.getElementsByTagName('h1')[1].innerText = "Good!"
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
    else {
        document.getElementsByTagName('h1')[1].innerText = "Wrong.."
        setTimeout(function () {
            if (confirm("wanna play again?")) {
                location.reload();
            } else {
                window.close();
            }
        }, 500);
    }
})

rock.addEventListener("dragover", function (e) {
    e.preventDefault()
    // console.log(e)
    // console.log("over r");
})
paper.addEventListener("dragover", function (e) {
    e.preventDefault()
    // console.log("over p");
})
sciss.addEventListener("dragover", function (e) {
    e.preventDefault()
    // console.log("over s");
})
