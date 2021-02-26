var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require("./classes/Grass");
var Eatgrass = require("./classes/Eatgrass");
var Gishatich =  require("./classes/Gishatich");
var Taguhi = require("./classes/Taguhi");
var Mat = require("./classes/Mat");

var weather = 'winter';
var stats = [];

matrix = [];

GrassArr = [];
EatgrassArr = [];
GishatichArr = [];
TaguhiArr = [];
MatArr = [];

app.use(express.static("."));

app.get("/", function(req, res){
   res.redirect("index.html");
});

server.listen(3000);

io.on('connection', function (socket) {
   console.log('a user connected');
   socket.on("thisEvent", function(data){
      console.log("this Event is being");
   })
   socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

getRandomArrayElement = function(arr) {
	let randomIndex = Math.floor(Math.random() * arr.length);
	let randomElement = arr[randomIndex];
	return randomElement;
}

function matrixGenerator(row, column) {
	for(var n = 0; n < column; n++){
      matrix[n] = [];
      for(var e = 0; e < row; e++){
         matrix[n][e] = getRandomInt(1, 6);
      }
   }
}

function start(){
   matrixGenerator(50, 50);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                EatgrassArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                GrassArr.push(grass);
            } else if (matrix[y][x]==3){
                var gish=new Gishatich(x,y);
                GishatichArr.push(gish);
            } else if (matrix[y][x]==4){
                var taguhi = new Taguhi(x,y);
                TaguhiArr.push(taguhi);
            } else if(matrix[y][x]==5){
                var mat=new Mat(x,y);
                MatArr.push(mat);
            }
        }
    }
}

function game() {
	 for (var i in GrassArr) {
        GrassArr[i].mul();
    }
    for (var i in EatgrassArr) {
        EatgrassArr[i].eat();
    }
    for (var i in GishatichArr) {
        GishatichArr[i].eat();
    }
     for (var i in TaguhiArr) {
        TaguhiArr[i].eat();
    }
    for (var i in MatArr) {
        MatArr[i].eat();
    }
	var data = {
		'matrix': matrix,
		'weater': weather
	};
	io.sockets.emit('matrixUpdate', data);
	saveStats();
}

function saveStats() {
    var fileName = 'stats.json';
	var statsObject = {
		'GrassCount': GrassArr.length,
		'EatgrassCount': EatgrassArr.length,
		'GishatichCount': GishatichArr.length,
      'TaguhiCount': TaguhiArr.length,
		'MatCount': MatArr.length
	};

    stats.push(statsObject);
    fs.writeFileSync(fileName, JSON.stringify(stats, null, 4));
}

start();

setInterval(game, 1000);