
const pixelizr = {
    draw() {
        this.getCurrentColor(variables.x, variables.y);
        return this.drawPixel(variables.x, variables.y);
    },

    
    getCurrentColor(x, y) {
        data.imgX = map(x, 0, width, 0, data.img.width);
        data.imgY = map(y, 0, height, 0, data.img.height);
        data.c = color(data.img.get(data.imgX, data.imgY));
        data.greyscale = round(red(data.c) * 0.222 + green(data.c) * 0.707 + blue(data.c) * 0.071);
        return data.c;
    },

    fillWithColor(pixelConfig) {
        switch(pixelConfig.mode) {
            case Mode.color:
                fill(data.c);
                break;
            case Mode.blackAndWhite:
                fill(0);
                break;
            case Mode.whiteAndBlack:
                fill(255);
                break;
            case Mode.greyscale:
                fill(data.greyscale);
                break;
            case Mode.random:
                fill(random(0,255),random(0,255),random(0,255));
                break;
            case Mode.contrastedRandom:
                let [r, g, b] = [
                    255 - random(0, 255 - data.greyscale * 0.1),
                    255 - random(0, 255 - data.greyscale * 0.8),
                    255 - random(0, 255 - data.greyscale * 1)
                ];
                fill(r, g, b);
                break;
        }
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
        let pixelConfigList = [...param.pixelConfig];
        while (pixelConfigList.length >= 1) {
            const pixelConfig = pixelConfigList.pop();
            this.fillWithColor(pixelConfig);
            let space = this.drawSymbol(x, y, pixelConfig);
            maxSpace = {
                width: max(maxSpace.width, space.width),
                height: max(maxSpace.height, space.height),
            }
        }
        return maxSpace;
    },

    drawPixelCircle(x, y) {
        const circleSize = map(data.greyscale, 0, 255, param.gridX, 5);
        circle(x, y, circleSize);
        return {
            width: circleSize,
            height: circleSize
        };
    },

    drawPixelRectangle(x, y) {
        const width = map(data.greyscale, 0, 255, param.gridX, 0);
        rect(x, y, width, param.gridY);
        return {
            width,
            height: param.gridY
        };
    },

    drawPixelLosange(x, y) {
        push();
        rotate(PI/3);
        const space = this.drawPixelRectangle(x, y);
        pop();
        return space;
    },

};