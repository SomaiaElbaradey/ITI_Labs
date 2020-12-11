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
      + "<td\>" + bookArr[i].Author.mail + "<td>" + "<button class='delete' value=" + i + ">Delete Book</button>" +
      "<td>" + "<button class='update' value=" + i + ">update </button>";
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
  //update book 
  var index;
  document.querySelectorAll('.update').forEach(function (item) {
    item.addEventListener('click', function (e) {
      index = e.target.value;
      e.target.parentNode.parentNode.innerHTML = "<td id='updated'><input id='updatedName' required type='text'> <td ><input id='updatedPrice'"
        + " required type='number'> <td><input id='updatedAuthor' required type='text'> <td><input id='updatedMail' required"
        + "type='text'><td><button class='save'>save</button><td><button class='cancel' >cancel </button>";
      //save
      document.querySelectorAll('.save').forEach(function (item) {
        item.addEventListener('click', function () {
          // document.getElementsByTagName("td").remove();
          var bookName = document.getElementById("updatedName").value;
          var price = document.getElementById("updatedPrice").value;
          var authorName = document.getElementById("updatedAuthor").value;
          var authorMail = document.getElementById("updatedMail").value;
          if (isNaN(price) || !isNaN(bookName) || !isNaN(authorName) || !mailRegExp.test(authorMail)) {
            alert("you entered unvalid data");
            throw("error");
          }
          bookArr[index] =
          {
            name: bookName,
            price: price,
            Author: {
              name: authorName,
              mail: authorMail
            }
          }
          var rows = Array.from(document.getElementsByTagName('TD'));
          rows.forEach(function (rowItem) {
            rowItem.remove();
          })
          displayBooks();
        })
      })
      //cancel
      document.querySelectorAll('.cancel').forEach(function (item) {
        item.addEventListener('click', function () {
          var rows = Array.from(document.getElementsByTagName('TD'));
          rows.forEach(function (rowItem) {
            rowItem.remove();
          })
          displayBooks();
        })
      })
    })
  })
}
//var book = new Book("soom", 25, "issaac", "aeemis@gmail.com");
