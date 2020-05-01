/// <reference path="../node_modules/@types/p5/global.d.ts" />

const Mode = {
    blackAndWhite: 0,
    color: 1,
    random: 2,
};

let param = {
    fontSizeMax: 15,
    fontSizeMin: 5,

    spacing: 9, // line height
    kerning: 0.2, // between letters
    
    multiplier: 10, // improve performance
    
    fontSizeStatic: false,
    blackAndWhite: false,

    gridX: 100,
    gridY: 100,

    mode: Mode.color,
};


let variables = {};

let data = {
    inputText: "pouet",
};

function preload() {
    data.img = loadImage('../assets/img/sources/pop75x57.jpg');
}

function setup() {
    createCanvas(data.img.width*param.multiplier,data.img.height*param.multiplier);
    print(data.img.width + ' • ' + data.img.height);
    background(255);
    ellipseMode(CORNER);
    rectMode(CENTER);

    variables.x = 0;
    variables.y = 0;

    noStroke();    
    data.img.loadPixels();
}

function draw() {
    const color = getCurrentColor(variables.x, variables.y);
    // const effectiveSpace = drawPixelCircle(variables.x, variables.y, false);
    // const effectiveSpace = drawPixelCircle(variables.x, variables.y);
    
    const effectiveSpace = drawPixelRectangle(variables.x, variables.y, false);
    variables.y += effectiveSpace.height;

    if (variables.y >= height) {
        variables.y = 0;
        variables.x += param.gridX;
    }
    if (variables.x >= width) {
    //    noLoop();
        print(param);
        print(data);

        variables.x = 0
        variables.y = 0
    }

    param.gridX = map(mouseX, 0, width, 20, 50);
}

function getCurrentColor(x, y) {
    data.imgX = map(x, 0, width, 0, data.img.width);
    data.imgY = map(y, 0, height, 0, data.img.height);
    data.c = color(data.img.get(data.imgX, data.imgY));
    data.greyscale = round(red(data.c) * 0.222 + green(data.c) * 0.707 + blue(data.c) * 0.071);
    return data.c;
}

function chooseColorMode(){
    if (param.mode === Mode.color) {
        fill(data.c)
    } else if(param.mode === Mode.blackAndWhite) {
        fill(0);
    } else if(param.mode === Mode.random) {
        fill(random(0,255),random(0,255),random(0,255));
    }
}

function drawPixelCircle(x, y) {
    const circleSize = round(map(data.greyscale, 0, 255, 0, param.gridX));
    chooseColorMode();
    circle(x, y, circleSize);
    return {
        width: circleSize,
        height: circleSize
    };
}

function drawPixelRectangle(x, y) {
    const width = round(map(data.greyscale, 0, 255, param.gridX, 0));
    chooseColorMode();
    rect(x, y, width, param.gridY);
    return {
        width,
        height: param.gridY
     };
}

function printElapsedTime(callback) {
    let before = millis();
    callback();
    let after = millis();
    print("before : " + before + ", ", 
          "after : " + after + ", ", 
          "after - before : " + (after - before));
}