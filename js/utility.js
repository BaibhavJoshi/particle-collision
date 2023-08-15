

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