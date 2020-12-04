var mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
var numOfBooks;
var bookArr = [];
var formMsg = document.getElementById("formMsg");
var numMsg = document.getElementById("numMsg");
function Book(name, price, authorName, authorMail) {
  this.name = name;
  this.price = price;
  this.Author = new Object();
  this.Author.name = authorName;
  this.Author.mail = authorMail;
}
document.getElementById("okBtn").addEventListener("click", function (e) {
  if (document.getElementById("bookNum").value == '') {
    numMsg.innerText = "you didn't enter a value!";
    throw ("you didn't enter a value");
  }
  numOfBooks = document.getElementById("bookNum").value;
  if (numOfBooks <= 0) {
    numMsg.innerText = "you can't add zero or negetive number of books";
    throw ("you can't add zero books");
  }
  document.getElementById("myDiv").style.display = 'none';
  document.getElementById("divForm").style.display = 'block';
  document.getElementById("submit").addEventListener("click", function (e) {
    var bookName = document.getElementById("bookName").value;
    var price = document.getElementById("price").value;
    var authorName = document.getElementById("authorName").value;
    var authorMail = document.getElementById("authorMail").value;
    if (numOfBooks == 1) {
      if (isNaN(price) || !isNaN(bookName) || !isNaN(authorName) || !mailRegExp.test(authorMail)) {
        formMsg.innerText = "you entered unvalid data";
      } else {
        var book = new Book(bookName, price, authorName, authorMail);
        bookArr.push(book);
        numOfBooks--;
        document.getElementById("divForm").style.display = 'none';
        displayBooks();
      }
    } else {
      if (isNaN(price) || !isNaN(bookName) || !isNaN(authorName) || !mailRegExp.test(authorMail)) {
        formMsg.innerText = "you entered unvalid data";
      } else {
        var book = new Book(bookName, price, authorName, authorMail);
        bookArr.push(book);
        //console.log(bookArr)
        numOfBooks--;
      }
    }
    e.preventDefault();
    document.getElementById("bookForm").reset();
  })
})
var displayBooks = function () {
  document.getElementById("tableDiv").style.display = 'block';
  for (var i = 0; i < bookArr.length; i++) {
    var table = document.getElementsByTagName("table")[0];
    var row = document.createElement("tr");
    row.innerHTML = "<td>" + bookArr[i].name + "<td>" + bookArr[i].price + "<td>" + bookArr[i].Author.name
      + "<td\>" + bookArr[i].Author.mail + "<td>" + "<button class='delete' value="+ i + ">Delete Book</button>";
    table.appendChild(row);
  }
  //delete book 
document.querySelectorAll('.delete').forEach(function (item) {
  item.addEventListener('click', function (e) {
      console.log(e.target.value);
      bookArr.splice(e.target.value, 1);
      e.target.parentNode.parentNode.style.display = 'none';
      var btns = document.getElementsByClassName("delete");
      for (var i = 0; i < btns.length; i++) {
        btns[i].value--;
      }
  })
})
}
//var book = new Book("soom", 25, "issaac", "aeemis@gmail.com");
