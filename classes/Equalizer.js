var LivingCreature = require('./LivingCreature');
module.exports = class Equalizer extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
        this.directions = [];
        for (var k = 0; k < matrix.length; k++) {
            if ((x + k) <= matrix[k].length && (y + k) <= matrix.length) {
                var zangvac1 = [this.x - k, this.y - k];
                var zangvac2 = [this.x, this.y - k];
                var zangvac3 = [this.x + k, this.y - k];
                var zangvac4 = [this.x - k, this.y];
                var zangvac5 = [this.x + k, this.y];
                var zangvac6 = [this.x - k, this.y + k];
                var zangvac7 = [this.x, this.y + k];
                var zangvac8 = [this.x + k, this.y + k];
                this.directions.push(zangvac1);
                this.directions.push(zangvac2);
                this.directions.push(zangvac3);
                this.directions.push(zangvac4);
                this.directions.push(zangvac5);
                this.directions.push(zangvac6);
                this.directions.push(zangvac7);
                this.directions.push(zangvac8);
            }
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

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(5);
        var cord = getRandomArrayElement(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy++;
            for (var i in MatArr) {
                if (x == MatArr[i].x && y == MatArr[i].y) {
                    MatArr.splice(i, 1);
                }
            }
        } else {
            var fundCords = this.chooseCell(4);
            var cord = getRandomArrayElement(fundCords);

            if (cord) {
                var x = cord[0];
                var y = cord[1];

                matrix[y][x] = 6;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                this.energy++;

                for (var i in TaguhiArr) {
                    if (x == TaguhiArr[i].x && y == TaguhiArr[i].y) {
                        TaguhiArr.splice(i, 1);
                    }
                }
            } else { 
                this.move();
                this.energy--;
                if (this.energy <= 3) {
                    this.die();
                }
            }
        }
    }
    mul() {
        this.multiply++;
        var newCell = getRandomArrayElement(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newEqualizer = new Equalizer(newCell[0], newCell[1], this.index);
            eArr.push(newEqualizer);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eArr) {
            if (this.x == eArr[i].x && this.y == eArr[i].y) {
                eArr.splice(i, 1);
            }
        }
    }
}