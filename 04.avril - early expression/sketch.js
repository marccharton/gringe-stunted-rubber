let param = {
    fontSizeMax: 15,
    fontSizeMin: 5,

    spacing: 9, // line height
    kerning: 0.2, // between letters
    
    divider: 1, // improve performance
    
    fontSizeStatic: false,
    blackAndWhite: false,

    gridX: 10,
    gridY: 2,
};

let variables = {};

let data = {
    inputText: "pouet",
};

function preload() {
    data.img = loadImage('data/pop1.jpg');
  }

function setup() {
    createCanvas(data.img.width/param.divider,data.img.height/param.divider);
    textFont('Times');
    textSize(10);
    textAlign(LEFT, CENTER);
    print(data.img.width + ' • ' + data.img.height);

    background(255);
    ellipseMode(CORNER);
    rectMode(CENTER);

    variables.x = 0;
    variables.y = 0;
    variables.textCounter = 0;

    noStroke();
    
    //data.img.loadPixels();
}

function draw() {
    const color = getCurrentColor(variables.x, variables.y);
       
    // const effectiveSpace = drawPixelCircle(variables.x, variables.y, false);
    // const effectiveSpace = drawPixelCircle(variables.x, variables.y);
    const effectiveSpace = drawPixelRectangle(variables.x, variables.y, false);
    variables.y += effectiveSpace;

    if (variables.y >= height) {
        variables.y = 0;
        variables.x += param.gridX;
    }
    if (variables.x >= width) {
        noLoop();
        print(param);
        print(data);
    }
}

function getCurrentColor(x, y) {
    data.imgX = x;
    data.imgY = y;
    data.c = color(data.img.get(data.imgX, data.imgY));
    data.greyscale = round(red(data.c) * 0.222 + green(data.c) * 0.707 + blue(data.c) * 0.071);
    return data.c;
}

function drawPixelCircle(x, y, colored=true) {
    const circleSize = round(map(data.greyscale, 0, 255, 2, param.gridX));
    if (colored) {
        fill(data.c)
    }
    circle(x, y, circleSize);
    return circleSize;
}

function drawPixelRectangle(x, y, colored=true) {
    const width = round(map(data.greyscale, 0, 255, param.gridX, 1));
    if (colored) {
        fill(data.c)
    } else {
        fill(0);
    }
    rect(x, y, width, param.gridY);
    return param.gridY;
}

function printElapsedTime(callback) {
    let before = millis();
    callback();
    let after = millis();
    print("before : " + before + ", ", 
          "after : " + after + ", ", 
          "after - before : " + (after - before));
}