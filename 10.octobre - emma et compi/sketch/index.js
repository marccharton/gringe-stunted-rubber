/// <reference path="../node_modules/@types/p5/global.d.ts" />

let data = {
    img: {},
    graphics: {},
};
let param = {
    imagePath: "../assets/img/sources/",
    imageName: "mariage",
    imageExtension: "jpg",
};
let startedTime = null;

function preload() {
    data.img = loadImage(`${param.imagePath}/${param.imageName}.${param.imageExtension}`);
}

function setup() {
    let [graphicsWidth, graphicsHeight] = [data.img.width * options.multiplier, data.img.height * options.multiplier];
    createCanvas(graphicsWidth, graphicsHeight).parent("container");
    param.graphics = createGraphics(graphicsWidth, graphicsHeight);
    // param.graphics.loadPixels();

    print(data.img.width + ' • ' + data.img.height);
    renderer.init(param.imageName);
    pixelizr.init(options)
            .setSourceImage(data.img)
            .setup();
    imageParser.init(options.parsingMode);
    startedTime = millis();
}

function draw() {
    imageParser.run();
    // options.gridX = map(mouseX, 0, width, 20, 50);
}

function keyReleased() {
    mapKeyToFunc("s", () => renderer.save() );
    mapKeyToFunc("r", () => renderer.remove() );
}



function mapKeyToFunc(keyCode, func) {
    if (key === keyCode || key === keyCode.toLowerCase() ||  key === keyCode.toUpperCase()) {
        func();
    }
}

function printElapsedTime(callback) {
    let before = millis();
    callback();
    let after = millis();
    printTime(before, after);
}

function printTime(before, after) {
    print("before : " + before + ", ", 
          "after : " + after + ", ", 
          "after - before : " + (after - before) / 1000 + " s" );
}
