const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");
// c.fillStyle = 'rgba(255, 0,0,0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "#fa34a4";
// c.stroke();

// Arc / Circle
// c.arc(300, 300, 30, 30, 0, Math.PI * 2, false);

// random
// const timer = () => {
//     for(var i = 0; i < 3; i++) {
//         var x = Math.random() * window.innerWidth;
//         var y = Math.random() * window.innerHeight;
//         c.beginPath();
//         c.arc(x, y, 30, 0, Math.PI * 2, false);
//         c.strokeStyle = 'blue';
//         c.stroke();
//     }
// };
//
// setInterval(timer, 1000);

// mouse
let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40,
    colorArray = [
        '#2C3E50',
        '#E74C3C',
        '#ECF0F1',
        '#3498DB',
        '#2980B9'
    ],
    minRadius = 2;

// event
window.addEventListener('mousemove', function (event) {
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

// circle
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    // this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x+= this.dx;
        this.y+= this.dy;

        // interactive
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init() {

    circleArray = [];
    for(let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 * 1,
            x = Math.random() * (innerWidth - radius * 2) + radius, //величина х
            y = Math.random() * (innerHeight - radius * 2) + radius, //величина у
            dx = (Math.random() - 0.5),  //скорость по гоизонтали
            dy = (Math.random() - 0.5); //скорость по вертикали
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

let circle = new Circle(200, 200, 3, 3, 30);

// animation
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();