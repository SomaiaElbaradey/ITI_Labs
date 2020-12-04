function Rect(width, height) {
    console.log("the number of created rectangles:" + Rect.count());
    if (!isNaN(width) || !isNaN(height)) {
        this.width = width;
        this.height = height;
    }
    else {
        throw ("width and height must be a number");
    }
}
Rect.count = (function () {
    var counter = 1;
    return function () {
        return counter++;
    }
})();
Rect.prototype.area = function () {
    return this.width * this.height;
}
Rect.prototype.perimeter = function () {
    return (2 * this.height) + (2 * this.width)
}
Rect.prototype.toString = function () {
    return ["the width of your shape is: " + this.width + ", the height is: " + this.height + ", the area is: " +
        this.area() + ", and the perimeter is: " + this.perimeter()]
}

var rect1 = new Rect(2, 3);
var rect2 = new Rect(5, 3);
var rect3 = new Rect(10, 3);