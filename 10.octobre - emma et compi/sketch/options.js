const options = {

    multiplier: 7,
    
    parsingMode: ParsingMode.vertical,

    gridX: 30,
    gridY: 30,

    darkBackground: false, 

    colorPalette: [
        '#009',
        '#FFFF00',
    ],
    colorDefinition : 100,

    pixelConfig: [
        {
            mode: Mode.color,
            pixelShape: PixelShape.circle,
            staticGrid: {
                x: false,
                y: true,
            },
            // tilt: {
            //     mode: TiltMode.translate.further,
            //     depth: 100,
            // },
            negativeMode: false,
            paletteBorders: [],
        },
    ],
    
};