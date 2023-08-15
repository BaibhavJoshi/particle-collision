import { getDistance, handleCollision } from "./utility.js";

export default class Particle{

    constructor(x, y, radius, color, ctx){
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random()-0.5) * 2,
            y: (Math.random()-0.5) * 2
        }
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.ctx = ctx;
        this.opacity = 0.2;
    }

    update(particles, mouse){

        this.draw();

        // Movement

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.velocity.x = -this.velocity.x;
        }
        
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            this.velocity.y = -this.velocity.y;
        }

        // Mouse stuff

        if(getDistance(mouse.x, mouse.y, this.x, this.y) <= 150 && this.opacity <= 0.5){
            this.opacity += 0.02;
        } else {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        // Collision detection

        for(let i = 0; i < particles.length; i++){
            if(particles[i] === this){
                continue;
            } else {
                // Check for collision
                if(getDistance(this.x, this.y, particles[i].x, particles[i].y) <= this.radius + particles[i].radius){
                    handleCollision(this, particles[i]);
                }
            }
        }

    }


    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.save()
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}