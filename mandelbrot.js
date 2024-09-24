//mandelbrot's formula: f(z) = z^2 + c
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

const REAL_SET = {start: -2, end: 1};
const IMAGINARY_SET = {start: -1, end: 1};

let realSetSize = REAL_SET.end - REAL_SET.start;
let imgSetSize = IMAGINARY_SET.end - IMAGINARY_SET.start;

const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' :
    `#${((1 << 24) * Math.random() | 0).toString(16)}`)

function draw() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            complex = {
                x: REAL_SET.start + (i/WIDTH) * (realSetSize),
                y: IMAGINARY_SET.start + (j/HEIGHT) * (imgSetSize),
            }
            const [n, isMandelbrot] = mandelbrot(complex);
            ctx.fillStyle = colors[isMandelbrot ? 0 : (n % colors.length - 1) + 1];
            ctx.fillRect(i, j, 1, 1);
        }
    }
}
draw();

function mandelbrot(c) {
    const MAX_ITERATIONS = 80;
    let z= {x: 0, y:0}, i=0, aux, mod;
    do{
        aux = { //computes z^2
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }
        z = { //computes z^2 + c
            x: aux.x + c.x,
            y: aux.y + c.y
        }
        mod = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)); //module of z
        i += 1;
    }while(mod <= 2 && i < MAX_ITERATIONS);
    return [i, mod <= 2]
}



