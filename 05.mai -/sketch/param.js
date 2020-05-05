
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
    imagePath: "../assets/img/sources/",
    imageName: "owl",
    imageExtension: "jpg",

    multiplier: 1,
    
    gridX: 3,
    gridY: 2,

    darkBackground: true, 

    pixelConfig: [
        {
            mode: Mode.color,
            pixelShape: PixelShape.rectangle,
        },
        {
            mode: Mode.contrastedRandom,
            pixelShape: PixelShape.circle,
        },
    ],
    
};