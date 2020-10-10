/// <reference path="../node_modules/@types/p5/global.d.ts" />

const Mode = {
    color: 0,
    blackAndWhite: 1,
    whiteAndBlack: 2,
    greyscale: 3,
    random: 4,
    contrastedRandom: 5,
    palette: 6,
};

const PixelShape = {
    circle: 0,
    rectangle: 1,
    losange: 2,
    text: 3,
};

const TiltMode = {
    translate: {
        regular: 0,
        further: 1,
        crazy: 2,
    },
};

const pixelizr = {
    options: {},
    currentPixel: {},
    imgSource: {},
    pixelConfigList: [],
    gridX: {},
    gridY: {},

    init(options) {
        this.options = options;
        if (options.imgSource !== undefined) {
            this.setSourceImage(options.imgSource);
        }
        
        this.gridX = options.gridX || 10;
        this.gridY = options.gridY || 10;
        
        this.pixelConfigList = options.pixelConfig || [{ mode: Mode.greyscale, pixelShape: PixelShape.rectangle }];
        
        if (options.pixelConfig.filter((pc) => pc.mode === Mode.palette).length > 0) {
            this.colorPalette = chroma.scale(options.colorPalette).mode('lch').colors(options.colorDefinition);
            console.log(this.colorPalette);
        }
        
        return this;
    },
    
    setSourceImage(sourceImage) {
        this.sourceImage = sourceImage;
        this.sourceImage.loadPixels();
        return this;
    },

    setup() {
        ellipseMode(CENTER);
        param.graphics.ellipseMode(CENTER);
        rectMode(CENTER);
        param.graphics.rectMode(CENTER);
        noStroke();
        param.graphics.noStroke();

        if (this.options.darkBackground) {
            background(0);
            param.graphics.background(0);
        } else {
            background(255);
            param.graphics.background(255);
        }
    },

    draw(x, y, counter) {
        this.getCurrentColor(x, y);
        return this.drawPixel(x, y, counter);
    },

    getPixel(x, y) {
        return this.sourceImage.get(x, y);
    },

    getPixelRaw(x, y) {
        const d = 1; // set these to the coordinates
        let off = (y * width + x) * d * 4;
        print("x :", x);
        print("y :", y);
        print("off :", off);
        let components = [
            this.sourceImage[off + 0],
            this.sourceImage[off + 1],
            this.sourceImage[off + 2],
            this.sourceImage[off + 3]
        ];
        return components;
    },

    getCurrentColor(x, y) {
        this.sourceImage.loadPixels();
        let imgX = Math.floor(map(x, 0, width, 0, this.sourceImage.width));
        let imgY = Math.floor(map(y, 0, height, 0, this.sourceImage.height));

        const pixel = this.getPixel(imgX, imgY);
        const pixelRaw = this.getPixelRaw(imgX, imgY);
        print("with get:", pixel);
        print("with pixels[]:", pixelRaw);

        this.currentPixel.color = color(pixel);
        this.currentPixel.greyscale = round(red(this.currentPixel.color) * 0.222 + green(this.currentPixel.color) * 0.707 + blue(this.currentPixel.color) * 0.071);
        return this.currentPixel.color;
    },

    fillWithColor(pixelConfig) {
        const modes = {};

        modes[Mode.color] = () => fill(this.currentPixel.color);
        modes[Mode.blackAndWhite] = () => fill(0);
        modes[Mode.whiteAndBlack] = () => fill(255);
        modes[Mode.greyscale] = () => fill(this.currentPixel.greyscale);
        modes[Mode.random] = () => fill(random(0, 255), random(0, 255), random(0, 255));
        modes[Mode.contrastedRandom] = () => {
            let [r, g, b] = [
                255 - random(0, 255 - this.currentPixel.greyscale * 1),
                255 - random(0, 255 - this.currentPixel.greyscale * 1),
                255 - random(0, 255 - this.currentPixel.greyscale * 1)
            ];
            fill(r, g, b);
            param.graphics.fill(r, g, b);
        };
        modes[Mode.palette] = () => {
            const index = Math.floor(map(this.currentPixel.greyscale, 0, 255, 0, this.colorPalette.length - 1));
            fill(this.colorPalette[index]);
            param.graphics.fill(this.colorPalette[index]);
        };
        // modes[Mode.text] = () => {
        //     // set text properties
        // };

        return modes[pixelConfig.mode]();
    },

    drawSymbol(x, y, pixelConfig, counter) {
        const shapes = {};

        shapes[PixelShape.ellipse] = () => {
            const circleSizeX = Math.floor(map(this.currentPixel.greyscale, 0, 255, this.gridX, 5));
            const circleSizeY = Math.floor(map(this.currentPixel.greyscale, 0, 255, this.gridY, 5));
            ellipse(x, y, circleSizeX, circleSizeY);
            param.graphics.ellipse(x, y, circleSizeX, circleSizeY);
            return this.createGrid([circleSizeX, circleSizeY]);
        };
        shapes[PixelShape.circle] = () => {
            const circleSizeX = Math.floor(map(this.currentPixel.greyscale, 0, 255, this.gridX, 5));
            const circleSizeY = Math.floor(map(this.currentPixel.greyscale, 0, 255, this.gridY, 5));
            circle(x, y, circleSizeX);
            param.graphics.circle(x, y, circleSizeX);
            return this.createGrid([circleSizeX, circleSizeX]);
        };
        shapes[PixelShape.rectangle] = () => {
            const staticGrid = pixelConfig.staticGrid || { x: false, y: false };
            let width, height;

            if (staticGrid.x) {
                width = this.gridX;
            }else {
                let [minWidthLimit, maxWidthLimit] = pixelConfig.negativeMode ? [3, this.gridX] : [this.gridX, 3];
                width = staticGrid.x ? this.gridX : Math.floor(map(this.currentPixel.greyscale, 0, 255, minWidthLimit, maxWidthLimit));
            }

            if (staticGrid.y) {
                height = this.gridY;
            }else {
                let [minHeightLimit, maxHeightLimit] = pixelConfig.negativeMode ? [3, this.gridY] : [this.gridY, 3];
                height = staticGrid.y ? this.gridY : Math.floor(map(this.currentPixel.greyscale, 0, 255, minHeightLimit, maxHeightLimit));
            }

            rect(x, y, width, height);
            param.graphics.rect(x, y, width, height);

            if (pixelConfig.tilt !== undefined) {
                return this.createGrid([... this.tilt(width, height, pixelConfig)]);
            }
            return this.createGrid([width, height]);
        };
        shapes[PixelShape.losange] = () => {
            push();
            rotate(PI / 3);
            const space = this.drawPixelRectangle(x, y);
            pop();
            return space;
        };
        shapes[PixelShape.text] = () => {
            textFont('Times');
            let fontSize = Math.floor(map(this.currentPixel.greyscale, 0, 255, pixelConfig.fontSize + 5, pixelConfig.fontSize - 5));
            textSize(fontSize);
            textAlign(LEFT, CENTER);
            textStyle(BOLD);
            let letter = pixelConfig.text.charAt(counter);
            text(letter, x, y + 15);
            let letterWidth = textWidth(letter) + pixelConfig.kerning;
            console.log({letterWidth});
            // let letterHeight = textHeight(letter) + pixelConfig.kerning;

            return this.createGrid([letterWidth, letterWidth]);
            // get current letter, draw letter
        };
        
        return shapes[pixelConfig.pixelShape]();
    },
    
    tilt(width, height, pixelConfig) {
        const gs = this.currentPixel.greyscale;
        let offsetX, offsetY;
        const tiltDepth = pixelConfig.tilt.depth || 1;

        switch(pixelConfig.tilt.mode) {
            case TiltMode.translate.regular:
                offsetX = Math.floor(map(gs, 0, 255, 0, this.gridX * tiltDepth/4));
                offsetY = Math.floor(map(gs, 0, 255, 0, this.gridY * tiltDepth/4));
                break;
            case TiltMode.translate.further:
                offsetX = Math.floor(map(gs, 0, 255, -(this.gridX/2), this.gridX));
                offsetY = Math.floor(map(gs, 0, 255, -(this.gridY/2), this.gridY));
                break;
            case TiltMode.translate.crazy:
                offsetX = random(-(this.gridX/2), this.gridX);
                offsetY = random(-(this.gridY/2), this.gridY);                
                break;
        }
        return [width + offsetX, height + offsetY];
    },

    drawPixel(x, y, counter) {
        let maxSpace = { width: 0, height: 0 };
        let pixelConfigList = [...this.pixelConfigList];

        while (pixelConfigList.length >= 1) {
            let pixelConfig = pixelConfigList.shift();
            this.fillWithColor(pixelConfig);
            let space = this.drawSymbol(x, y, pixelConfig, counter);
            maxSpace = this.createGrid([max(maxSpace.width, space.width), max(maxSpace.height, space.height)]);
        }
        return maxSpace;
    },

    createGrid([width, height]) {
        return { 
            width, 
            height 
        };
    }

};