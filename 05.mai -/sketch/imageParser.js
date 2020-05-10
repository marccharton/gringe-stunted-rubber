
const ParsingMode = {
    horizontal: 0,
    vertical: 1,
};

const imageParser = {
    
    init(parsingMode) {

        this.parsingMode = parsingMode;
        
        this.firstDimension = 0;
        this.firstConstraint = parsingMode === ParsingMode.horizontal ? width : height;
        this.firstGridSize = parsingMode === ParsingMode.horizontal ? options.gridX : options.gridY;
        
        this.secondDimension = 0;
        this.secondConstraint = parsingMode === ParsingMode.horizontal ? height : width;
        this.secondGridSize = parsingMode === ParsingMode.horizontal ? options.gridY : options.gridX;

        // console.log({firstDimension: this.firstDimension});
        // console.log({firstConstraint: this.firstConstraint});
        // console.log({secondDimension: this.secondDimension});
        // console.log({secondConstraint: this.secondConstraint});
        // console.log({firstGridSize: this.firstGridSize});
        // console.log({secondGridSize: this.secondGridSize});
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