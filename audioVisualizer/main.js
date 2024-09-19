import {Michrophone, Analyser} from "./Structure.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize",()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

class Bar {
    constructor(posx,posy,width,height) {
        this.x = posx;
        this.y = posy;
        this.width = width;
        this.height = height;
        this.color = 0;
    }
    update(color, height) {
        this.color = color;
        const sound = height;
        if (sound > this.height) {
            this.height = height;
        }
        else {
            this.height -= this.height * 0.05;
        }
    }
    draw(i) {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i*0.0355);

        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.y,this.height);
        ctx.stroke();

        ctx.rotate(i*0.001);
        ctx.strokeRect(this.y + this.height,this.height * 1.5,this.height/2,this.width);
        ctx.beginPath();
        ctx.arc(this.x + i*2, this.y,this.height * 0.2,0,Math.PI*2);
        ctx.stroke();

        ctx.restore();
    }
}

class Button {
    constructor(element, text) {
        this.button = element;
        this.on = true;
        this.button.innerText = text;
    }
    updateText(text) {
        this.button.innerText = text;
    }
}

let button = new Button(document.getElementById("button"), "Audio");
let input = document.getElementById("input");
let inputColor = document.getElementById("color");
let dyn = document.getElementById("dyn");

let microId;
let audioId;
let audio;
let playing = false;

let color;

input.addEventListener("change",(e)=>{
    let file = e.target.files[0];

    audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.play();
    playing = true;
});


button.button.addEventListener("click",()=>{
    if(button.on) {
        button.on = false;
        button.updateText("Microphone");

        const microphone = new Michrophone();

        let bars = [];

        let number = 256;
        let width = canvas.width/number;
        let height = 50;

        for (var i = 0; i<number;i++) {
            bars.push(new Bar(0, i*2, width, 10))
        }

        function animate() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0,0, canvas.width,canvas.height);

            if (microphone.initialized) {
                const sample = microphone.getSamples();
                bars.forEach((bar,i) => {
                    if (dyn.checked) {
                        color = "hsl("+sample[i] * 500 +", 100%, 50%)";
                    }
                    else {
                        color = inputColor.value;
                    }
                    bar.update(color, sample[i]*1000);
                    bar.draw(i);
                })
            }

            microId = requestAnimationFrame(animate);
        }

        animate();
    }
    else {
        button.on = true;
        button.updateText("Audio");

        cancelAnimationFrame(microId);

        let bars = [];

        let number = 256;
        let width = canvas.width/number;
        let height = 50;

        for (var i = 0; i<number;i++) {
            bars.push(new Bar(0, i*2, width, 10))
        }

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canvas.width,canvas.height);

        const analyser = new Analyser(audio);

        function animate() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0,0, canvas.width,canvas.height);

            analyser.update();

            bars.forEach((bar, i) => {
                if (dyn.checked) {
                    color = "hsl("+analyser.dataArray[i] +", 100%, 50%)";
                }
                else {
                    color = inputColor.value;
                }
                bar.update(color, analyser.dataArray[i]);
                bar.draw(i);
            })

            audioId = requestAnimationFrame(animate);
        }

        animate();
    }
})

canvas.addEventListener("click",()=>{
    if (button.on) {

        if (playing) {
            try {
                audio.pause();
                playing = false;
            }
            catch {

            }
        }
        else {
            try {
                audio.play();
                playing = true;
            }
            catch {

            }
        }
    } 
})