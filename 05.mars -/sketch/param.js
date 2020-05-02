/// <reference path="../node_modules/@types/p5/global.d.ts" />

const Mode = {
    color: 0,
    blackAndWhite: 1,
    whiteAndBlack: 2,
    greyscale: 3,
    random: 4,
    contrastedRandom: 5,
};

const PixelShape = {
    circle: 0,
    rectangle: 1,
    losange: 2,
};

const param = {
    fontSizeMax: 15,
    fontSizeMin: 5,

    spacing: 9, // line height
    kerning: 0.2, // between letters
    
    multiplier: 8, // improve performance
    
    fontSizeStatic: false,
    blackAndWhite: false,

    gridX: 15,
    gridY: 20,

    mode: Mode.blackAndWhite,
    pixelShape: PixelShape.rectangle,
};