// 继承多个接口
var square_m = {};
var square = {};
square.sideLength = 100;
square.color = "red";
function start(ps) {
    console.log(ps.color, ps.sideLength);
}
var par = { color: "red", name: 'quanwei', sideLength: 100 };
console.log('square', square);
start(par);
