const options = {

    multiplier: 5,
    
    parsingMode: ParsingMode.horizontal,

    gridX: 20,
    gridY: 10,

    darkBackground: true, 

    colorPalette: [
        '#f0f',
        '#FFFF00',
    ],
    colorDefinition : 100,

    pixelConfig: [
        {
            mode: Mode.palette,
            pixelShape: PixelShape.circle,
            staticGrid: {
                x: false,
                y: false,
            },
            negativeMode: true,
            paletteBorders: [],
        },
        // {
        //     mode: Mode.whiteAndBlack,
        //     pixelShape: PixelShape.circle,
        // },
    ],
    
};