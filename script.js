var sideLength = 30;
var numberOfSides = 20;

var socket = io();
function rainbow() {
    socket.emit("thisEvent");
    setTimeout(function () {
        document.getElementById("myButton").disabled = true;
    }, 50);
    setTimeout(function () {
        document.getElementById("myButton").disabled = false;
    }, 5000);
}

function restart() {
    socket.emit("thatEvent");
}

socket.on('matrixUpdate', drawMatrix);
socket.on('statsUpdate', writeStats);


function setup() {
    frameRate(5);
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength);
    background('#acacac');
}

function writeStats(statsObject){
    var GrassCount = statsObject.GrassCount;
    var EatgrassCount = statsObject.EatgrassCount;
    var GishatichCount = statsObject.GishatichCount;
    var TaguhiCount = statsObject.TaguhiCount;
    var MatCount = statsObject.MatCount;
    var EqualizerCount = statsObject.EqualizerCount;
    
    document.getElementById("GrassCount").innerText = GrassCount.toString();
    document.getElementById("EatgrassCount").innerText = EatgrassCount.toString();
    document.getElementById("GishatichCount").innerText = GishatichCount.toString();
    document.getElementById("TaguhiCount").innerText = TaguhiCount.toString();
    document.getElementById("MatCount").innerText = MatCount.toString();
    document.getElementById("EqualizerCount").innerText = EqualizerCount.toString();
}

function drawMatrix(data) {
    var matrix = data.matrix;
    var weather = data.weather;
    document.getElementById("wheater").innerText = weather.toString();
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                if (weather == 'summer') {
                    fill("green");
                } else {
                    fill("white");
                }
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 3) {
                fill("blue");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 4) {
                fill("red");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if (matrix[i][j] == 5) {
                fill("brown");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            } else if(matrix[i][j]==6){
                fill("black");
                rect(j * sideLength, i * sideLength, sideLength, sideLength);
            }
        }
    }
}

