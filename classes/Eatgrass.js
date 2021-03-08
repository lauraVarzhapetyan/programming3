var LivingCreature = require('./LivingCreature')
module.exports = class Eatgrass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 250;
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


            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;
        }
    }



    eat() {

        var fundCords = this.chooseCell(1);
        var cord = getRandomArrayElement(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;


            this.multiply++;


            this.energy++;


            for (var i in GrassArr) {
                if (x == GrassArr[i].x && y == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
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



            var norXotaker = new Eatgrass(x, y);
            EatgrassArr.push(norXotaker);


            matrix[y][x] = 2;

        }
    }


    die() {

        matrix[this.y][this.x] = 0;


        for (var i in EatgrassArr) {
            if (this.x == EatgrassArr[i].x && this.y == EatgrassArr[i].y) {
                EatgrassArr.splice(i, 1);
            }
        }
    }

}