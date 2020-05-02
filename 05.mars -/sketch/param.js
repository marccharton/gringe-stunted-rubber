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

const param = {
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
    pixelShape: PixelShape.rectangle,
};