const options = {

    multiplier: 7,
    
    parsingMode: ParsingMode.horizontal,

    gridX: 30,
    gridY: 20,

    darkBackground: true, 

    colorPalette: [
        '#f0f',
        '#FFFF00',
    ],
    colorDefinition : 100,

    pixelConfig: [
        {
            mode: Mode.whiteAndBlack,
            pixelShape: PixelShape.rectangle,
            staticGrid: {
                x: true,
                y: false,
            },
            tilt: {
                mode: TiltMode.translate.further,
                depth: 100,
            },
            negativeMode: false,
            paletteBorders: [],
        },
    ],
    
};