var side = 5;
var xotArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var gishatichArr=[];
var taguhiArr=[];
var matArr=[];
var matrix=[];
var row=80;
var column=80;
for( var n=0; n<row; n++)
{
    matrix[n]=[];
    for( var e=0; e<column; e++)
    {
        matrix[n][e]=Math.round(Math.random()*5);
    }
}

function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');
  
    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            } else if (matrix[y][x]==3){
                var gish=new Gishatich(x,y);
                gishatichArr.push(gish);
            } else if (matrix[y][x]==4){
                var taguhi = new Taguhi(x,y);
                taguhiArr.push(taguhi);
            } else if(matrix[y][x]==5){
                var mat=new Mat(x,y);
                matArr.push(mat);
            }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j]==3){
                fill("blue");
                rect(j*side, i*side, side, side);
            } else if(matrix[i][j]==4){
                fill("red");
                rect(j*side, i*side, side, side)
            } else if(matrix[i][j]==5){
                fill("brown");
                rect(j*side, i*side, side, side);
            }
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
     for (var i in taguhiArr) {
        taguhiArr[i].eat();
    }
    for (var i in matArr) {
        matArr[i].eat();
    }
}
