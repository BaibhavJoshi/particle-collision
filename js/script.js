// Imports

import {randomIntFromRange, randomColor, getDistance} from "./utility.js";
import Particle from "./Particle.js"

// Setup

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables

let mouse = {
    x: undefined,
    y: undefined
};

const colors = [
    "#355070",
    "#6d597a",
    "#b56576",
    "#e56b6f",
    "#eaac8b"
];


// Event Listeners

window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function(event){
    this.location.reload();
});


// Initializing particles

const verticalGridLines = 20;
const horizontalGridLines = 20;
const numBoxes = verticalGridLines * horizontalGridLines;
const boxWidth = canvas.width/verticalGridLines;
const boxHeight = canvas.width/horizontalGridLines;
let matrix = new Array(verticalGridLines).fill(0).map(() => new Array(horizontalGridLines).fill(0));

let numParticles = numBoxes / 3;
let particles;


function initialize(){
    
    particles = [];

    for(let i = 0; i < numParticles; i++){

        let x;
        let y;
        const radius = randomIntFromRange(boxWidth/4, boxWidth/3);
        const color = randomColor(colors);

        // Get random box from matrix

        let xIndex = randomIntFromRange(1, horizontalGridLines - 1);
        let yIndex = randomIntFromRange(1, verticalGridLines - 1);

        // Check if box is empty, if empty -> fill it

        if(matrix[xIndex][yIndex] == 0){
        
            x = (xIndex * boxWidth) + (Math.random() - 0.5)*(boxWidth/3);
            y = (yIndex * boxHeight) + (Math.random() - 0.5)*(boxHeight/3);

            // Mark box in matrix as filled
            matrix[xIndex][yIndex] = 1;

        } else {

            while(matrix[xIndex][yIndex] != 0){

                xIndex = randomIntFromRange(1, horizontalGridLines - 1);
                yIndex = randomIntFromRange(1, verticalGridLines - 1);

            }

            x = (xIndex * boxWidth) + (Math.random() - 0.5)*(boxWidth/3);
            y = (yIndex * boxHeight) + (Math.random() - 0.5)*(boxHeight/3);

            // Mark box in matrix as filled
            matrix[xIndex][yIndex] = 1;

        }

        particles.push(new Particle(x, y, radius, color, ctx));
    }
    
    // Filter out particles at the edges

    particles = particles.filter(function(particle){
        let safeX = particle.x + particle.radius < canvas.width && particle.x - particle.radius > 0;
        let safeY = particle.y + particle.radius < canvas.height && particle.y + particle.radius > 0;
        return safeX && safeY;
    })


}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
}

initialize();
animate();