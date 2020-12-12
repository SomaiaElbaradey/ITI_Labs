var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var sciss = document.getElementById("sciss");
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
    var char = e.path[1].getAttribute('data-value');
    if (val == 'paper') {
        if (char == 'r') {
            e.path[1].setAttribute('data-value', 'p')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'p') {

        } else if (char == 's') {

        }
    } else if (val == 'sciss') {
        if (char == 'p') {
            e.path[1].setAttribute('data-value', 's')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 's') {

        } else if (char == 'r') {

        }
    } else if (val == 'rock') {
        if (char == 's') {
            e.path[1].setAttribute('data-value', 'r')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'r') {

        } else if (char == 'p') {

        }
    }
    // rock = document.getElementById("rock");
    // paper = document.getElementById("paper");
    // sciss = document.getElementById("sciss");
})

paper.addEventListener("drop", function (e) {
    // console.log("drop p");
    var val = e.dataTransfer.getData("name");
    var char = e.path[1].getAttribute('data-value');
    if (val == 'paper') {
        if (char == 'r') {
            e.path[1].setAttribute('data-value', 'p')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'p') {

        } else if (char == 's') {

        }
    } else if (val == 'sciss') {
        if (char == 'p') {
            e.path[1].setAttribute('data-value', 's')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = paper.innerHTML;
        } else if (char == 's') {

        } else if (char == 'r') {

        }
    } else if (val == 'rock') {
        if (char == 's') {
            e.path[1].setAttribute('data-value', 'r')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'r') {

        } else if (char == 'p') {

        }
    }
})

sciss.addEventListener("drop", function (e) {
    // console.log("drop s");
    var val = e.dataTransfer.getData("name");
    var char = e.path[1].getAttribute('data-value');
    if (val == 'paper') {
        if (char == 'r') {
            e.path[1].setAttribute('data-value', 'p')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'p') {

        } else if (char == 's') {

        }
    } else if (val == 'sciss') {
        if (char == 'p') {
            e.path[1].setAttribute('data-value', 's')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 's') {

        } else if (char == 'r') {

        }
    } else if (val == 'rock') {
        if (char == 's') {
            e.path[1].setAttribute('data-value', 'r')
            var temp = this.innerHTML;
            this.innerHTML = paper.innerHTML;
            e.path[1].innerHTML = temp;
        } else if (char == 'r') {

        } else if (char == 'p') {

        }
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
