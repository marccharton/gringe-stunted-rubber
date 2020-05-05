const Mode = {
    color: 0,
    blackAndWhite: 1,
    whiteAndBlack: 2,
    greyscale: 3,
    random: 4,
    contrastedRandom: 5,
};

const PixelShape = {
    circle: 0,
    rectangle: 1,
    losange: 2,
};

const pixelizr = {
    options: {},
    currentPixel : {},
    imgSource : {},
    pixelConfigList: [],
    gridX: {},
    gridY: {},

    init(options) {
      this.options = options;
      if (options.imgSource === undefined) {
          throw "imgSource must be declared";
      }
      this.imgSource = options.imgSource;

      this.gridX = options.gridX || 10;
      this.gridY = options.gridY || 10;

      this.pixelConfigList = options.pixelConfig;
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
        let imgX = map(x, 0, width, 0, this.imgSource.width);
        let imgY = map(y, 0, height, 0, this.imgSource.height);
        this.currentPixel.color = color(this.imgSource.get(imgX, imgY));
        this.currentPixel.greyscale = round(red(this.currentPixel.color) * 0.222 + green(this.currentPixel.color) * 0.707 + blue(this.currentPixel.color) * 0.071);
        return this.currentPixel.color;
    },

    fillWithColor(pixelConfig) {
        const modes = {};

        modes[Mode.color] = () =>  fill(this.currentPixel.color);
        modes[Mode.blackAndWhite] = () => fill(0);
        modes[Mode.whiteAndBlack] = () => fill(255);
        modes[Mode.greyscale] = () => fill(this.currentPixel.greyscale);
        modes[Mode.random] = () => fill(random(0,255),random(0,255),random(0,255));
        modes[Mode.contrastedRandom] = () => {
            let [r, g, b] = [
                255 - random(0, 255 - this.currentPixel.greyscale * 1),
                255 - random(0, 255 - this.currentPixel.greyscale * 1),
                255 - random(0, 255 - this.currentPixel.greyscale * 1)
            ];
            fill(r, g, b);
        };
      
        return modes[pixelConfig.mode]();
    },

    drawSymbol(x, y, pixelConfig) {
        switch(pixelConfig.pixelShape) {
            case PixelShape.circle:
                return this.drawPixelCircle(x, y);
            case PixelShape.rectangle:
                return this.drawPixelRectangle(x, y);
            case PixelShape.losange:
                return this.drawPixelLosange(x, y);
        }
    },

    drawPixel(x, y) {
        let maxSpace = {width: 0, height: 0};
        let pixelConfigList = [...this.pixelConfigList];
        while (pixelConfigList.length >= 1) {
            let pixelConfig = pixelConfigList.shift();
            this.fillWithColor(pixelConfig);
            let space = this.drawSymbol(x, y, pixelConfig);
            maxSpace = this.createGrid(max(maxSpace.width, space.width), max(maxSpace.height, space.height));
        }
        return maxSpace;
    },

    drawPixelCircle(x, y) {
        const circleSize = map(this.currentPixel.greyscale, 0, 255, this.gridX, 5);
        circle(x, y, circleSize);
        return this.createGrid(circleSize, circleSize);
    },

    drawPixelRectangle(x, y) {
        const width = map(this.currentPixel.greyscale, 0, 255, this.gridX, 0);
        rect(x, y, width, this.gridY);
        return this.createGrid(width, this.gridY);
    },

    drawPixelLosange(x, y) {
        push();
        rotate(PI/3);
        const space = this.drawPixelRectangle(x, y);
        pop();
        return space;
    },

    createGrid(width, height) {
        return { width, height };
    }

};