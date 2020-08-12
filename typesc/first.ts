// 继承接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWdith: number;
}

// 继承一个结构
interface Square extends Shape {
    sideLength: number;
}

interface Square_mul extends Shape, PenStroke {
    sideLength: number;
}

// 继承多个接口
let square_m = <Square_mul>{};
square_m.penWdith = 200;
square_m.color = "red";
square_m.sideLength = 10;

let square = <Square>{};
square.sideLength = 100;
square.color = "red";

function start(ps: Square | Square_mul): void {
    console.log(ps.color, ps.sideLength);
}

let par = {color: "red", name: 'quanwei', sideLength: 100}
console.log('square', square);
start(par)
