function Box(height, width, length, volume, material) {
  if (isNaN(height) || isNaN(width) || isNaN(length) || isNaN(volume)) {
    throw ("your box values isn't valild")
  } else {
    this.height = height;
    this.width = width;
    this.length = length;
    this.volume = volume;
    this.material = material;
    this.content = [];
    this.numOfBooks = 0;
  }
  //create book object
  this.addBook = function (title, numofChapters, author, numofPages, publisher, numofCopies) {
    if (isNaN(numofChapters) || isNaN(numofPages) || isNaN(numofCopies)) {
      throw ("your box values isn't valild")
    } else {
      var book = {
        title: title,
        numofChapters: numofChapters,
        author: author,
        numofPages: numofPages,
        publisher: publisher,
        numofCopies: numofCopies
      }
      if (this.content.length == 0) {
        this.content.push(book);
        this.numOfBooks++;
      } else {
        var _this = this;
        this.content.forEach(function (item) {
          if (item.title == book.title) {
            return ["the book already exist!"];
          } else {
            //console.log(this)
            _this.content.push(book);
            _this.numOfBooks++;
          }
        })
      }
      return book;
    }
  }
  //delete any of these books in box according to book name 
  this.deleteBook = function (name) {
    var _this = this;
    var found = 0;
    this.content.forEach(function (item) {
      if (item.title == name) {
        var index = _this.content.indexOf(item);
        _this.content.splice(index, 1);
        _this.numOfBooks--;
        found = 1;
      }
    })
    if (found == 1) {
      return _this.content;
    } else {
      return ["the deleted book doesn't exist!"];
    }
  }
}
//count # of books inside box
Box.prototype.countBooks = function () {
  return this.numOfBooks;
}
//override valueof() 
Box.prototype.valueof = function () {
  return this.numOfBooks;
}
//override to string
Box.prototype.toString = function () {
  console.log("the dimensions of the box are: ");
  console.log("height: " + this.height + ", the width: " + this.width + ", the lenght: " + this.length);
  console.log("the books stored in the content are: ");
  this.content.forEach(function (item) {
    console.log(item.title);
  })
  return ["number of books: " + this.numOfBooks + " which stored in box content"];
}

var box1 = new Box(3, 4, 5, 15, "paper");
box1.addBook("desert", 5, "Maha", 200, "max", 5);
box1.addBook("sea", 5, "bla", 10, "saeem", 19);
var box2 = new Box(3, 15, 18, 19, "battee5");
box2.addBook("roses", 45, "zina", 74, "max", 12);
box2.addBook("perrf", 10, "zoon", 19, "saeem", 13);
//box2.addBook("roses", 45, "zina", 74, "max", 12);