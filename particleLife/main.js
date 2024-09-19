
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = 1000;
let HEIGHT = 700;

canvas.width = WIDTH;
canvas.height = HEIGHT;

class Cluster {
    constructor(particles, rules) {
        this.particles = particles;
        this.rules = rules;
        this.energy = 100;
    }

    update(clusters) {
        this.particles.forEach(particle1 => {
            this.particles.forEach(particle2 => {
                if (particle1 !== particle2) {
                    this.rules.internal.forEach(rule => {
                        if (rule.from === particle1.color && rule.to === particle2.color) {
                            particle1.update(particle2, rule.force);
                        }
                    });
                }
            });
        });

        let toRemove = [];

        clusters.forEach(cluster1 => {
            clusters.forEach(cluster2 => {
                if (cluster1 !== cluster2) {
                    cluster1.particles.forEach(particle1 => {
                        cluster2.particles.forEach(particle2 => {
                            this.rules.external.forEach(rule => {
                                if (rule.from === particle1.color && rule.to === particle2.color) {
                                    toRemove.push(particle1.update(particle2, rule.force));
                                }
                            });
                        })
                    })
                };
            });
        });

        return toRemove;
    }

    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        })
    }
}


function normalize(vx, vy) {
    let magnitude = Math.sqrt(vx * vx + vy * vy);
    if (magnitude > 0) {
        vx /= magnitude;
        vy /= magnitude;
    }
    return { vx, vy };
}

class Particle {
    constructor(x, y, radius, c) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = c;
        this.vx = 0;
        this.vy = 0;
        this.counter = 0;
    }

    update(particle, F) {
        let dx = this.x - particle.x;
        let dy = this.y - particle.y;

        let r = Math.sqrt(dx * dx + dy * dy);

        if (r < (this.radius + particle.radius) + 5) {
            if (this.color == "red" && particle.color == "green") {
                this.energy += 100;
                return particle;
            } else {
                this.counter++;
                let overlap = 0.5 * ((this.radius + particle.radius) - r);
                let angle = Math.atan2(dy, dx);
                this.x -= overlap * Math.cos(angle);
                this.y -= overlap * Math.sin(angle);
                particle.x += overlap * Math.cos(angle);
                particle.y += overlap * Math.sin(angle);

                this.vx += - this.vx*2.1;
                this.vy += - this.vy*2.1;

                let velocity = normalize(this.vx, this.vy);
                let speedLimit = 1.5;

                this.vx = velocity.vx * Math.min(speedLimit, Math.sqrt(this.vx * this.vx + this.vy * this.vy));
                this.vy = velocity.vy * Math.min(speedLimit, Math.sqrt(this.vx * this.vx + this.vy * this.vy));

                this.vx *= 0.98; 
                this.vy *= 0.98;

                this.x += this.vx;
                this.y += this.vy;
            }
        } else if ( r < 80) {
            let vx = F * (dx / r) * 0.5;
            let vy = F * (dy / r) * 0.5;

            this.vx += vx;
            this.vy += vy;

            let velocity = normalize(this.vx, this.vy);
            let speedLimit = 1.5;

            this.vx = velocity.vx * Math.min(speedLimit, Math.sqrt(this.vx * this.vx + this.vy * this.vy));
            this.vy = velocity.vy * Math.min(speedLimit, Math.sqrt(this.vx * this.vx + this.vy * this.vy));

            this.vx *= 0.98; 
            this.vy *= 0.98;

            this.x += this.vx;
            this.y += this.vy;
        }

        if (this.x <= this.radius || this.x >= WIDTH) {
            this.vx *= -1;
        }
        if (this.y <= this.radius || this.y >= HEIGHT) {
            this.vy *= -1;
        }

        this.energy -= 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

function random(number) {
    return Math.random() * number;
}

function  create(color, number, posX, posY) {
    let cluster = [];
    for (let j = 0; j < number; j++) {
        cluster.push(new Particle(random(100) + posX, random(100) + posY, 5, color));
    }
    return cluster;
}
function  createAll(color, number) {
    let cluster = [];
    for (let j = 0; j < number; j++) {
        cluster.push(new Particle(random(WIDTH), random(HEIGHT), 5, color));
    }
    return cluster;
}

class Rule {
    constructor(from, to, force) {
        this.from = from;
        this.to = to;
        this.force = force;
    }
}

let rules = {
    internal: [
        new Rule("yellow", "yellow", -0.0005),
        new Rule("yellow", "red", -0.05),
        new Rule("red", "yellow", -0.00005),
        new Rule("red", "red", -0.05),
        new Rule("green","green", 0.01),

    ],
    external: [
        new Rule("yellow", "yellow", -0.001),
        new Rule("red", "red", 0.01),
        new Rule("yellow", "red", 0.001),
        new Rule("green", "yellow", 0.01),
        new Rule("red","green", -0.001),
    ],
}

let clusters = [];

for (let i = 0; i < 5; i++) {
    let posX = random(WIDTH);
    let posY = random(HEIGHT);

    if (posX > WIDTH-50) {
        posX = WIDTH-50;
    }
    if (posX < 50) {
        posX = 50;
    }
    if (posY > HEIGHT-50) {
        posY = HEIGHT-50;
    }
    if (posY < 50) {
        posY = 50;
    }

    let yellow = create("yellow", 20, posX,posY)
    let red = create("red", 3, posX,posY)

    clusters.push(new Cluster([...yellow, ...red],rules));
}

clusters.push(
    new Cluster(
        createAll("green", 100), rules
    )
)

function run() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    clusters.forEach(cluster => {
        let toRemove = cluster.update(clusters);
        cluster.draw();

        toRemove.forEach(element => {
            let index = cluster.part
        })
    })

    requestAnimationFrame(run);
}

run();

