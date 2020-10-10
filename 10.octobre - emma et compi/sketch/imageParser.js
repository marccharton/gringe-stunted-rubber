
const ParsingMode = {
    horizontal: 0,
    vertical: 1,
};

const imageParser = {
    counter : 0,
    actualSpace: {},
    
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
            // this.secondDimension += actualSpace.height;
        }

        if (this.counter === 1472) {
            this.counter = 0;
        }

        actualSpace = this.parsingMode === ParsingMode.horizontal 
                        ? pixelizr.draw(this.firstDimension, this.secondDimension, this.counter++)
                        : pixelizr.draw(this.secondDimension, this.firstDimension, this.counter++);
        
        this.firstDimension += this.parsingMode === ParsingMode.horizontal ? actualSpace.width : actualSpace.height;
    },

    stop() {
        noLoop();
        
        // param.graphics.background(150, 170, 255);
        // param.graphics.rect()
        // param.graphics.updatePixels();
        
        //image(param.graphics, 0, 0);
        save(param.graphics, "graphics.jpg");
        save("canvas.jpg");
        print("data.img.pixels :", data.img.pixels);
        print("pixels :", pixels);
    }

};