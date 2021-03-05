var sideLength = 30;
var numberOfSides = 20;

var socket = io();
function rainbow(){
    socket.emit("thisEvent");
    setTimeout(function(){
        document.getElementById("myButton").disabled = true;
    }, 50);
    setTimeout(function(){
        document.getElementById("myButton").disabled = false;
    }, 5000);
}

function restart(){
    socket.emit("thatEvent");
}

socket.on('matrixUpdate', drawMatrix);

function setup() {
    frameRate(5);
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength); 
    background('#acacac');
}

function drawMatrix(data) {
    var matrix = data.matrix;
    var weather = data.weather;
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                if(weather=='summer'){
                fill("green");} else{
                    fill("white");
                }  
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            }else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            }else if (matrix[i][j] == 0) {
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
