

export function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

export function getDistance(xOne, yOne, xTwo, yTwo){

    let xDistance = xTwo - xOne;
    let yDistance = yTwo - yOne;

    return(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
}

export function handleCollision(pOne, pTwo){

    const xVelocityDiff = pOne.velocity.x - pTwo.velocity.x;
    const yVelocityDiff = pOne.velocity.y - pTwo.velocity.y;

    const xDist = pTwo.x - pOne.x;
    const yDist = pTwo.y - pOne.y;

    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0){
        
        // Angle between the colliding particles
        const angle = -Math.atan2(pTwo.y - pOne.y, pTwo.x - pOne.x);

        // Particle mass
        const mOne = pOne.mass;
        const mTwo = pTwo.mass;

        // Initial velocity
        const uOne = rotate(pOne.velocity, angle);
        const uTwo = rotate(pTwo.velocity, angle);

        // Final velocity (One dimensional collision)
        const vOne = {x: uOne.x * (mOne - mTwo)/(mOne + mTwo) + uTwo.x * 2 * mTwo/(mOne + mTwo), 
                    y: uOne.y};
        const vTwo = {x: uTwo.x * (mOne - mTwo)/(mOne + mTwo) + uOne.x * 2 * mTwo/(mOne + mTwo), 
                    y: uTwo.y};

        // Final velocity (rotated)
        const vOneRotated = rotate(vOne, -angle);
        const vTwoRotated = rotate(vTwo, -angle);

        pOne.velocity.x = vOneRotated.x;
        pOne.velocity.y = vOneRotated.y;

        pTwo.velocity.x = vTwoRotated.x;
        pTwo.velocity.y = vTwoRotated.y;
    } 

}

function rotate(velocity, angle){

    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;

}