import randomRange from './math';

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
    constructor(x, y, width, height, radius, strokeStyle = '#000', lineWidth = 2, dash = [0, 0]) {
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

// calculate points along circle path using parametric equation
function pointOnCircle(centerX, centerY, radius, angle) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
}

/**
 *
 * @param {Number} count
 * @param {Number} x
 * @param {Number} y
 * @param {Number} innerRadius
 * @param {Number} outerRadius
 */
function circleOfCircles(count, x, y, innerRadius, outerRadius) {
    // Check bounds of drawn circle
    const boundingRadius = (innerRadius + outerRadius);
    const top = y - boundingRadius;
    const left = x - boundingRadius;
    const bottom = y + boundingRadius;
    const right = x + boundingRadius;

    if (top < 0 || left < 0 || bottom > canvas.height || right > canvas.width) {
        return false;
    }

    // Calculate theta (angle of increment) and initial position
    const theta = (Math.PI * 2) / count;
    let position = pointOnCircle(x, y, innerRadius, theta);

    for (let index = 0, increment = theta; index < count; index++) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, outerRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#0f0';
        ctx.stroke();
        position = pointOnCircle(x, y, innerRadius, increment += theta);
    }

    return true;
}

function randomCircles(count, context, width, height) {
    for (let index = 0; index < count; index++) {
        context.beginPath();
        let color = (Math.random() * 16777216); // 16777216 = FFFFFF
        color = `#${Math.floor(color).toString(16)}`;
        const [x, y] = [width * Math.random(), height * Math.random()];
        context.arc(x, y, 20, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.stroke();
    }
}

// Setup 2d context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Adjust canvas style
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = '2px solid black';

// Make a circle surounded by circles
// circleOfCircles(10, canvas.width/2, canvas.height/2, 150, 25);
// Chris courses Canvas Api tutorial challenge 1
// randomCircles(24, ctx, canvas.width, canvas.height);


class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    update() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -(this.dx);
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -(this.dy);
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

// min: 2r, max: width-2r
let radius = 50;
const circle1 = new Circle(randomRange(2 * radius, window.innerWidth - 2 * radius),
    randomRange(2 * radius, window.innerHeight - 2 * radius),
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    radius);
radius = 30;
const circle2 = new Circle(randomRange(2 * radius, window.innerWidth - 2 * radius),
    randomRange(2 * radius, window.innerHeight - 2 * radius),
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    radius);

const circles = [circle1, circle2];

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circles.forEach((circle) => {
        circle.draw();
        circle.update();
    });

}

animate();
