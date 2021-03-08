var LivingCreature = require('./LivingCreature')
module.exports = class Taguhi extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 15;
        this.directions = [];
        for (var l = 0; l < matrix.length; l++) {
            var zangvac = [];
            var newX = l;
            var newY = y;
            zangvac.push(newX);
            zangvac.push(newY);
            this.directions.push(zangvac);
        }
    }
    getNewCoordinates() {
        this.directions;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = getRandomArrayElement(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = getRandomArrayElement(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy = this.energy + 2;
            for (var i in EatgrassArr) {
                if (x == EatgrassArr[i].x && y == EatgrassArr[i].y) {
                    EatgrassArr.splice(i, 1);
                }
            }


        } else {

            var fundCords = this.chooseCell(1);
            var cord = getRandomArrayElement(fundCords);

            if (cord) {
                var x = cord[0];
                var y = cord[1];


                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;


                this.x = x;
                this.y = y;


                this.energy++;


                for (var i in GrassArr) {
                    if (x == GrassArr[i].x && y == GrassArr[i].y) {
                        GrassArr.splice(i, 1);
                    }
                }




            } else {

                this.move();
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
    die() {

        matrix[this.y][this.x] = 0;


        for (var i in TaguhiArr) {
            if (this.x == TaguhiArr[i].x && this.y == TaguhiArr[i].y) {
                TaguhiArr.splice(i, 1);
            }
        }
    }
}