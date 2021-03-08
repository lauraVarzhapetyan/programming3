var LivingCreature = require('./LivingCreature')
module.exports = class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 150;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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


            matrix[y][x] = 3;
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
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in EatgrassArr) {
                if (x == EatgrassArr[i].x && y == EatgrassArr[i].y) {
                    EatgrassArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


    mul() {

        var fundCords = this.chooseCell(0);
        var cord = getRandomArrayElement(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norGishatich = new Gishatich(x, y);
            GishatichArr.push(norGishatich);

            matrix[y][x] = 3;

        }
    }


    die() {

        matrix[this.y][this.x] = 0;

        for (var i in GishatichArr) {
            if (this.x == GishatichArr[i].x && this.y == GishatichArr[i].y) {
                GishatichArr.splice(i, 1);
            }
        }
    }

}
