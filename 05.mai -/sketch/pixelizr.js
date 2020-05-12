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

        this.colorPalette = chroma.scale(options.colorPalette).mode('lch').colors(6);
    },

    setSourceImage(sourceImage) {
        this.sourceImage = sourceImage;
    },

    setup() {
        ellipseMode(CENTER);
        rectMode(CENTER);
        noStroke();

        if (this.options.darkBackground) {
            background(0);
        } else {
            background(255);
        }
    },

    draw(x, y) {
        this.getCurrentColor(x, y);
        return this.drawPixel(x, y);
    },

    getCurrentColor(x, y) {
        let imgX = map(x, 0, width, 0, this.sourceImage.width);
        let imgY = map(y, 0, height, 0, this.sourceImage.height);
        this.currentPixel.color = color(this.sourceImage.get(imgX, imgY));
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
        };
        modes[Mode.palette] = () => {
            const index = Math.floor(map(this.currentPixel.greyscale, 0, 255, 0, this.colorPalette.length));
            console.log({ index, color: this.colorPalette[index] });
            fill(this.colorPalette[index]);
        };

        return modes[pixelConfig.mode]();
    },

    drawSymbol(x, y, pixelConfig) {
        const shapes = {};

        shapes[PixelShape.ellipse] = () => {
            const circleSizeX = map(this.currentPixel.greyscale, 0, 255, this.gridX, 5);
            const circleSizeY = map(this.currentPixel.greyscale, 0, 255, this.gridY, 5);
            ellipse(x, y, circleSizeX, circleSizeY);
            return this.createGrid(circleSizeX, circleSizeY);
        };
        shapes[PixelShape.circle] = () => {
            const circleSizeX = map(this.currentPixel.greyscale, 0, 255, this.gridX, 5);
            const circleSizeY = map(this.currentPixel.greyscale, 0, 255, this.gridY, 5);
            circle(x, y, circleSizeX);
            return this.createGrid(circleSizeX, circleSizeX);
        };
        shapes[PixelShape.rectangle] = () => {
            const width = map(this.currentPixel.greyscale, 0, 255, this.gridX, 0);
            const height = map(this.currentPixel.greyscale, 0, 255, this.gridY, 0);
            const staticGrid = pixelConfig.staticGrid ?? { x: false, y: false };

            rect(x, y, staticGrid.x ? this.gridX : width, staticGrid.y ? this.gridY : height);
            return this.createGrid(width, this.gridY);
        };
        shapes[PixelShape.losange] = () => {
            push();
            rotate(PI / 3);
            const space = this.drawPixelRectangle(x, y);
            pop();
            return space;
        };

        return shapes[pixelConfig.pixelShape]();
    },

    drawPixel(x, y) {
        let maxSpace = { width: 0, height: 0 };
        let pixelConfigList = [...this.pixelConfigList];

        while (pixelConfigList.length >= 1) {
            let pixelConfig = pixelConfigList.shift();
            this.fillWithColor(pixelConfig);
            let space = this.drawSymbol(x, y, pixelConfig);
            maxSpace = this.createGrid(max(maxSpace.width, space.width), max(maxSpace.height, space.height));
        }
        return maxSpace;
    },

    createGrid(width, height) {
        return { width, height };
    }

};