cards = document.getElementsByClassName("card");
var count = 0;
var matchArr = new Array;
var cardsNum = new Array;
function openCard(num, val) {
    cards[num].src = "img/" + val + ".jpg";
    matchArr[count] = val;
    cardsNum[count] = num;
    count++;
    if (count > 1) {
        if (matchArr[0] == matchArr[1]) {
            matchArr = [];
            cardsNum = [];
        } else {
            setTimeout(() => {
                cards[cardsNum[0]].src = "img/0.jpg";
                cards[cardsNum[1]].src = "img/0.jpg";
                matchArr = [];
                cardsNum = [];
            }, 400);
        };
        count = 0;
    }
}