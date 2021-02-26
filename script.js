var sideLength = 30;
var numberOfSides = 30;

var socket = io();
function myFunction(){
    socket.emit("thisEvent");
}

socket.on('matrixUpdate', drawMatrix);


function setup() {
    noStroke();
    frameRate(5);
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength); 
    background('#acacac');
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function drawMatrix(data) {
    var matrix = data.matrix;
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j]==3){
                fill("blue");
               rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if(matrix[i][j]==4){
                fill("red");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if(matrix[i][j]==5){
                fill("brown");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            }
        }
    }
}
