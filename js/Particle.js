import { getDistance } from "./utility.js";

export default class Particle{

    constructor(x, y, radius, color, ctx){
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.random()-0.5,
            y: Math.random()-0.5
        }
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
    }

    update(particles){

        // Movement

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.velocity.x = -this.velocity.x;
        }
        
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            this.velocity.y = -this.velocity.y;
        }

        // Collision detection

        for(let i = 0; i < particles.length; i++){
            if(particles[i] === this){
                continue;
            } else {
                // Check for collision
                if(getDistance(this.x, this.y, particles[i].x, particles[i].y) <= this.radius + particles[i].radius){
                    console.log("CHILLLLL!!!");
                }
            }
        }

        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}