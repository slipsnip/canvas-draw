/** Class for rounded rectangle */
class roundRect {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} radius 
     * @param {string} strokeStyle // MDN: CanvasRenderingContext2D.strokeStyle
     * @param {number} lineWidth  // Thickness of line
     * @param {Array} dash // MDN: Array of numbers which specify distances to alternately draw a line and a gap
     */
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
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx // MDN: CanvasRenderingContext2D
     */
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

// Test rounded rectangle class
// const smoothRectangle = new roundRect(100, 100,300,300,25,"#f00");
// smoothRectangle.draw(ctx);

// Experiment with drawing lines, setting styles
// ctx.beginPath();
// ctx.moveTo(50,300);
// ctx.arcTo(300,100, 400, 300, 15);
// ctx.strokeStyle = "#fa34bc";
// ctx.setLineDash([4,4]);
// ctx.lineWidth = 5;
// ctx.stroke();

// Playing with arcs and circles
ctx.beginPath();
ctx.arc(235,235,130,0,1,true);
ctx.strokeStyle = "#0f0";
ctx.lineWidth = 2;
ctx.setLineDash([2,2]);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(235,235);

// Draw radius line
ctx.lineTo(235+130,235);
ctx.setLineDash([0,0]);
ctx.strokeStyle = "#000";
ctx.stroke();
