function roundRect(x, y, width, height, radius, ctx){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.draw = function(strokeStyle = "#000", lineWidth = 2, dash = [0,0]) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arcTo(this.x + this.width, this.y,this.x + this.width, this.y + this.height,this.radius);// tr corner
        ctx.arcTo(this.x + this.width, this.y + this.height, this.x,this.y + this.height,this.radius);// br corner
        ctx.arcTo(this.x,this.y + this.height,this.x, this.y, this.radius);// bl corner
        ctx.arcTo(this.x,this.y,this.x + this.width, this.y,this.radius);// tl corner
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        if (dash !== [0,0]) {
            ctx.setLineDash(dash);
        }
        ctx.stroke();
    };
}


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const actionRect = new roundRect(30,30,300,100,15,ctx);
actionRect.draw("#00f");