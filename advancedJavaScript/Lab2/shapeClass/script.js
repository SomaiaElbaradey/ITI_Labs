function Shape(dim1, dim2) {
    if (!isNaN(dim1)) {
        this.dim1 = dim1;
        this.dim2 = dim2;
    }
    else {
        throw ("width and height must be a number");
    }
    if (this.constructor == Rect) {
        if (Shape.countRec() == 1) {
            throw ("you can create only one rectangle")
        }
    }
    if (this.constructor == Shape) {
        throw ("you can't create object from shape!");
    }
}
Shape.prototype.area = function () {
    return this.dim1 * this.dim2;
}
Shape.prototype.perimeter = function () {
    return (2 * this.dim1) + (2 * this.dim2)
}
Shape.prototype.displayInfo = function () {
    return ["the width of your shape is: " + this.dim1 + ", the height is: " + this.dim2 + ", the area is: " +
        this.area() + ", and the perimeter is: " + this.perimeter()]
}
function Rect(dim1, dim2) {
    if (this.constructor == Square) {
        if (Rect.countSquare() == 1) {
            throw ("you can create only one square")
        }
    }
    Shape.call(this, dim1, dim2);
}
function Square(dim1) {
    Rect.call(this, dim1, dim1);
}
Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.constructor = Rect;
Square.prototype = Object.create(Rect.prototype);
Square.prototype.constructor = Square;
Rect.countSquare = (function () {
    var countSquare = 0;
    return function () {
        return countSquare++;
    }
})();
Shape.countRec = (function () {
    var countRec = 0;
    return function () {
        return countRec++;
    }
})();
var rect = new Rect(2, 3);
var sqr = new Square(5);
//var sqr1 = new Square(5);
//var rect1 = new Rect(2, 3);
//var sh = new Shape(2, 3);

