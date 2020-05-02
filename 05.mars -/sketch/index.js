/// <reference path="../node_modules/@types/p5/global.d.ts" />

const Mode = {
    blackAndWhite: 0,
    color: 1,
    random: 2,
};

const PixelShape = {
    circle: 0,
    rectangle: 1,
};

let param = {
    fontSizeMax: 15,
    fontSizeMin: 5,

    spacing: 9, // line height
    kerning: 0.2, // between letters
    
    multiplier: 10, // improve performance
    
    fontSizeStatic: false,
    blackAndWhite: false,

    gridX: 10,
    gridY: 20,

    mode: Mode.color,
};

let variables = {};
let data = {};

window.setup = () => app.setup();
window.draw = () => app.draw();
window.preload = () => app.preload();

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
    if (param.mode === Mode.color) {
        fill(data.c)
    } else if(param.mode === Mode.blackAndWhite) {
        fill(0);
    } else if(param.mode === Mode.random) {
        fill(random(0,255),random(0,255),random(0,255));
    }
}

function drawPixel(x, y, pixelShape = PixelShape.rectangle) {
    chooseColorMode();
    switch(pixelShape) {
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