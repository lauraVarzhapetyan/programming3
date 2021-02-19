var LivingCreature = require('./LivingCreature')
module.exports = class Mat extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy=30;
        this.directions=[];
        for (var k = 0; k < matrix.length; k++) {
            if ((x + k) <= matrix[k].length && (y + k) <= matrix.length) {
                var zangvac1 = [];
                var zangvac2 = [];
                var newx1 = x - k;
                var newx2 = x + k;
                var newy1 = y - k;
                var newy2 = y + k;
                zangvac1.push(newx1);
                zangvac2.push(newx2);
                zangvac1.push(newy1);
                zangvac2.push(newy2);
                this.directions.push(zangvac1);
                this.directions.push(zangvac2);
            }
        }
        console.log(this.directions);
    }
    getNewCoordinates() {
        this.directions;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.chooseCell(3);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                }
            }
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norMat = new Mat(x, y);
            matArr.push(norMat);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 5;
            // this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in matArr) {
            if (this.x == matArr[i].x && this.y == matArr[i].y) {
                matArr.splice(i, 1);
            }
        }
    }
}