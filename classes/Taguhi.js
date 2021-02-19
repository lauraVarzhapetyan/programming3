var LivingCreature = require('./LivingCreature')
module.exports = class Taguhi extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy=30;
        this.directions=[];
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
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy = this.energy + 2;
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }


        } else {
            //հետազոտում է շրջակայքը, որոնում է սնունդ
            var fundCords = this.chooseCell(1);
            var cord = random(fundCords);

            //եթե կա հարմար սնունդ
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
                //իր հին տեղը դնում է դատարկ վանդակ
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;

                //փոխում է սեփական կորդինատները օբյեկտի մեջ
                this.x = x;
                this.y = y;

                //մեծացնում է էներգիան
                this.energy++;

                //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
                //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
                for (var i in xotArr) {
                    if (x == xotArr[i].x && y == xotArr[i].y) {
                        xotArr.splice(i, 1);
                    }
                }

                //եթե պատրաստ է բազմացմանը, բազմանում է 


            } else {
                //եթե չկա հարմար սնունդ 
                this.move();
                this.energy--;
                if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                    this.die();
                }
            }
        }
    }
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in taguhiArr) {
            if (this.x == taguhiArr[i].x && this.y == taguhiArr[i].y) {
                taguhiArr.splice(i, 1);
            }
        }
    }
}