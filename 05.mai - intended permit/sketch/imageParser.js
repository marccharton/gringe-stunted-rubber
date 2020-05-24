
const ParsingMode = {
    horizontal: 0,
    vertical: 1,
};

const imageParser = {
    
    log() {
        console.log({firstDimension: this.firstDimension});
        console.log({firstConstraint: this.firstConstraint});
        console.log({secondDimension: this.secondDimension});
        console.log({secondConstraint: this.secondConstraint});
        console.log({firstGridSize: this.firstGridSize});
        console.log({secondGridSize: this.secondGridSize});
    },

    init(parsingMode) {

        this.parsingMode = parsingMode;
    
        const widthData = [0, width, options.gridX];
        const heightData = [0, height, options.gridY];
        const horizontalValues = [ ...widthData, ...heightData ];
        const verticalValues = [ ...heightData, ...widthData ];

        [ 
            this.firstDimension, this.firstConstraint, this.firstGridSize, 
            this.secondDimension, this.secondConstraint, this.secondGridSize 
        ] = parsingMode === ParsingMode.horizontal ? horizontalValues : verticalValues;

    },

    run(doesRedraw = false) {
        
        if (this.secondDimension >= this.secondConstraint + this.secondGridSize) {
            if (doesRedraw) {
                this.secondDimension = 0;
                this.firstDimension = 0;
            }
            else {
                this.stop();
            }
            
            printTime(startedTime, millis());
        }
        
        if (this.firstDimension >= this.firstConstraint  + this.firstGridSize) {
            this.firstDimension = 0;
            this.secondDimension += this.secondGridSize;
        }

        const actualSpace = this.parsingMode === ParsingMode.horizontal 
                                ? pixelizr.draw(this.firstDimension, this.secondDimension)
                                : pixelizr.draw(this.secondDimension, this.firstDimension);
        
        this.firstDimension += this.parsingMode === ParsingMode.horizontal ? actualSpace.width : actualSpace.height;
    },

    stop() {
        noLoop();
        print(data.img.pixels);
        print(pixels);
    }

};