//  1. Write a script to create different shapes (rectangle, square, circle, triangle) make all of them inherits from polygon.
// 2. Display the area and each object parameter in your console by overriding toString()
// 3. Draw your created shapes to a canvas element.

class Polygon {
    constructor(_dim1 = 0, _x = 0, _y = 0, _color = '#000', _fill = '#FFF') {
        if (this.constructor == Polygon) {
            throw 'can not create object of this class';
        }
        this.dim1 = _dim1;
        this.x = _x;
        this.y = _y;
        this.color = _color;
        this.fill = _fill;
    }

    toString() {
        console.log("the area of your shape:")
    }

    draw(ctx) {
        ctx = document.getElementById('canvas').getContext('2d');
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.fill;
    }
}

class Triangle extends Polygon {
    constructor(_dim1, _dim2 = 0, _x, _y, _fill, _color) {
        super(_dim1, _x, _y, _color, _fill);
        this.dim2 = _dim2;
    }

    toString() {
        super.toString();
        return 0.5 * this.dim2 * this.dim1;
    }

    draw(ctx) {
        super.draw();
        ctx.beginPath();
        ctx.moveTo(this.x + this.dim1 / 2, this.y);
        ctx.lineTo(this.x + this.dim1, this.y + this.dim2);
        ctx.lineTo(this.x, this.y + this.dim2);
        ctx.lineTo(this.x + this.dim1 / 2, this.y);
        ctx.fill();
        ctx.stroke();
    }
}


class Rectangle extends Polygon {
    constructor(_dim1, _dim2 = 0, _x, _y, _fill, _color) {
        super(_dim1, _x, _y, _color, _fill);
        this.dim2 = _dim2;
    }

    toString() {
        super.toString();
        return this.dim2 * this.dim1;
    }
    draw(ctx) {
        super.draw();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.dim1, this.y);
        ctx.lineTo(this.x + this.dim1, this.y + this.dim2);
        ctx.lineTo(this.x, this.y + this.dim2);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.stroke();
    }
}

class Square extends Polygon {
    toString() {
        super.toString();
        return this.dim1 * this.dim1;
    }
    draw(ctx) {
        super.draw();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.dim1, this.y);
        ctx.lineTo(this.x + this.dim1, this.y + this.dim1);
        ctx.lineTo(this.x, this.y + this.dim1);
        ctx.lineTo(this.x, this.y);
        ctx.fill();
        ctx.stroke();
    }
}

class Circle extends Polygon {
    toString() {
        super.toString();
        return this.dim1 * this.dim1 * Math.PI;
    }

    draw(ctx) {
        super.draw();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.dim1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}


let ctx = document.getElementById('canvas').getContext('2d');

let square = new Square(240, 10, 100, '#0E5192', '#255');
square.draw(ctx)

let rectangle = new Rectangle(25, 100, 156, 100, 'red', '#000');
rectangle.draw(ctx);

let circle = new Circle(25, 125, 50, '#25826', '#2828');
circle.draw(ctx);

let triangle = new Triangle(250, 100, 100, 100, '#0E5192', '#7AEA2F');
triangle.draw(ctx)