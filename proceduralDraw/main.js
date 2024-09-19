const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize",()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

class Root {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxLength = Math.random() * 100;
        this.length = 0;
        this.maxSize = Math.random() * 7 - 2;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 2 + 0.05;
        this.angleX = Math.random() * 6.2;
        this.vax = Math.random() * 0.6 -0.3;
        this.angleY = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 -0.3;
        this.lightness = 10;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);

        this.angleX += this.vax;
        this.angleY += this.vay;

        if (this.lightness < 70) this.lightness += 0.25;
        if (this.length < this.maxLength){
            if (this.size < this.maxSize) this.size += this.vs;;
            this.length += 1;
            ctx.beginPath();
            ctx.fillStyle = "hsl(140,100%,"+this.lightness+"%)";
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fill();
            ctx.stroke();

            requestAnimationFrame(this.update.bind(this));
        } 
        else {
            ctx.fillRect(this.x,this.y,this.height,this.height);
        }
    }
}

let drawing = false;

window.addEventListener("mousemove", (e)=>{
    if (drawing) {
        for (let i = 0; i < 3; i++) {
            const root = new Root(e.x,e.y);
            root.update();
        }
    }
})

window.addEventListener("mousedown", ()=>{
    drawing = true;
})

window.addEventListener("mouseup", ()=>{
    drawing = false;
})