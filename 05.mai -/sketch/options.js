const options = {

    multiplier: 5,
    
    parsingMode: ParsingMode.vertical,

    gridX: 90,
    gridY: 20,

    darkBackground: false, 

    colorPalette: [
        '#2A4858',
        '#fafa6e',
    ],

    pixelConfig: [
        {
            mode: Mode.palette,
            pixelShape: PixelShape.ellipse,
            staticGrid: {
                x: false,
                y: true,
            },
            paletteBorders: [],
        },
        // {
        //     mode: Mode.whiteAndBlack,
        //     pixelShape: PixelShape.circle,
        // },
    ],
    
};