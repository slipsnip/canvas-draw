class roundRect {
    constructor(x, y, width, height, radius, strokeStyle = "#000", lineWidth = 2, dash = [0, 0]) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.dash = dash;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.radius); // tr corner
        ctx.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.radius); // br corner
        ctx.arcTo(this.x, this.y + this.height, this.x, this.y, this.radius); // bl corner
        ctx.arcTo(this.x, this.y, this.x + this.width, this.y, this.radius); // tl corner
        // Set styles
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        if (this.dash !== [0, 0]) ctx.setLineDash(this.dash);
        ctx.stroke();
    }
}


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = "2px solid black";

const actionRect = new roundRect(100, 100,300,300,25,"#f00");
actionRect.draw(ctx);

ctx.beginPath();
ctx.moveTo(50,300);
ctx.arcTo(300,100, 400, 300, 15);
ctx.strokeStyle = "#fa34bc";
ctx.setLineDash = [4,4];
ctx.lineWidth = 5;
ctx.stroke();
