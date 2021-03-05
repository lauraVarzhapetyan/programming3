var LivingCreature = require('./LivingCreature')
module.exports = class Mat extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy=15;
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

      
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            
            this.x = x;
            this.y = y;
        }
    }


    
    eat() {
        
        var fundCords = this.chooseCell(3);
        var cord = getRandomArrayElement(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in GishatichArr) {
                if (x == GishatichArr[i].x && y == GishatichArr[i].y) {
                    GishatichArr.splice(i, 1);
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
           
            var norMat = new Mat(x, y);
            MatArr.push(norMat);

           
            matrix[y][x] = 5;
            
        }
    }

    die() {
        
        matrix[this.y][this.x] = 0;

       
        for (var i in MatArr) {
            if (this.x == MatArr[i].x && this.y == MatArr[i].y) {
                MatArr.splice(i, 1);
            }
        }
    }
}