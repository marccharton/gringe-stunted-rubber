
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

    run(callback, doesRedraw = false) {
        
        if (this.secondDimension >= this.secondConstraint + this.secondGridSize) {
            if (doesRedraw) {
                this.secondDimension = 0;
                this.firstDimension = 0;
            }
            else {
                noLoop();
            }
            
            printTime(startedTime, millis());
        }
        
        if (this.firstDimension >= this.firstConstraint  + this.firstGridSize) {
            this.firstDimension = 0;
            this.secondDimension += this.secondGridSize;
        }

        const effectiveSpace = this.parsingMode === ParsingMode.horizontal 
                                ? callback(this.firstDimension, this.secondDimension) 
                                : callback(this.secondDimension, this.firstDimension);
        
        this.firstDimension += this.parsingMode === ParsingMode.horizontal ? effectiveSpace.width : effectiveSpace.height;
    }

};