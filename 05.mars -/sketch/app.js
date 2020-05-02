/// <reference path="../node_modules/@types/p5/global.d.ts" />

let variables = {};
let data = {};

let app = {
    preload() {
        data.img = loadImage('../assets/img/sources/pop75x57.jpg');
    },

    setup() {
        createCanvas(data.img.width*param.multiplier,data.img.height*param.multiplier).parent("container");
        print(data.img.width + ' • ' + data.img.height);
        background(255);
        ellipseMode(CORNER);
        rectMode(CENTER);

        variables.x = 0;
        variables.y = 0;

        noStroke();    
        data.img.loadPixels();
    },

    draw() {
        getCurrentColor(variables.x, variables.y);        
        const effectiveSpace = drawPixel(variables.x, variables.y);
        variables.y += effectiveSpace.height;
    
        if (variables.y >= height) {
            variables.y = 0;
            variables.x += param.gridX;
        }
        if (variables.x >= width) {
            noLoop();
            print(param);
            print(data);
            variables.x = 0
            variables.y = 0
        }
        param.gridX = map(mouseX, 0, width, 20, 50);
    }
};

function getCurrentColor(x, y) {
    data.imgX = map(x, 0, width, 0, data.img.width);
    data.imgY = map(y, 0, height, 0, data.img.height);
    data.c = color(data.img.get(data.imgX, data.imgY));
    data.greyscale = round(red(data.c) * 0.222 + green(data.c) * 0.707 + blue(data.c) * 0.071);
    return data.c;
}

function chooseColorMode() {
    switch(param.mode) {
        case Mode.color:
            fill(data.c);
            break;
        case Mode.blackAndWhite:
            fill(0);
            break;
        case Mode.random:
            fill(random(0,255),random(0,255),random(0,255));
            break;
    }
}

function drawPixel(x, y) {
    chooseColorMode();
    switch(param.pixelShape) {
        case PixelShape.circle:
            return drawPixelCircle(x, y);
            break;
        case PixelShape.rectangle:
            return drawPixelRectangle(x, y);
            break;
    }
}

function drawPixelCircle(x, y) {
    const circleSize = map(data.greyscale, 0, 255, param.gridX, 0);
    circle(x, y, circleSize);
    return {
        width: circleSize,
        height: circleSize
    };
}

function drawPixelRectangle(x, y) {
    const width = map(data.greyscale, 0, 255, param.gridX, 0);
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