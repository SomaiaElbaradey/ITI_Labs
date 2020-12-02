function Rect(width, height) {
    if (!isNaN(width) || !isNaN(height)) {
        this.width = width;
        this.height = height;
    }
    else {
        throw("width and height must be a number");
    }
}
Rect.prototype.area = function () {
    return this.width * this.height;
}
Rect.prototype.perimeter = function () {
    return (2 * this.height) + (2 * this.width)
}
Rect.prototype.displayInfo = function () {
    console.log("the width of your shape is: " + this.width + ", the height is: " + this.height + ", the area is: " +
        this.area() + ", and the perimeter is: " + this.perimeter())
}

var rect1 = new Rect(2, 3);
rect1.displayInfo();