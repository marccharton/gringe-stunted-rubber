let data = {
    img: {},
};
let param = {
    imagePath: "../assets/img/sources/",
    imageName: "yassin",
    imageExtension: "jpg",
};
let startedTime = null;

let app = {
    preload() {
        data.img = loadImage(`${param.imagePath}/${param.imageName}.${param.imageExtension}`);
    },

    setup() {
        createCanvas(data.img.width * options.multiplier,
                     data.img.height * options.multiplier)
            .parent("container");
        // print(data.img.width + ' • ' + data.img.height);
        
        pixelizr.init(options).setSourceImage(data.img).setup();
        imageParser.init(options.parsingMode);
        startedTime = millis();
    },

    draw() {
        
        imageParser.run((x, y) => pixelizr.draw(x, y));
        
       // options.gridX = map(mouseX, 0, width, 20, 50);
    },

    keyReleased() {

        mapKeyToFunc("s", () => {
            const currentCount = incerementCounterLocally(param.imageName);
            const fileName = `${param.imageName}_${currentCount}`;
            saveCanvas(fileName, 'png');
        });
        
        mapKeyToFunc("r", () => {
            const key = `${param.imageName}RendersCount`;
            localStorage.removeItem(key);
        });
    }
};

function incerementCounterLocally(imageName) {
    const key = `${imageName}RendersCount`;
    const previousCount = localStorage.getItem(key);
    let currentCount = previousCount === null ? 0 : int(previousCount) + 1;
    
    localStorage.setItem(key, currentCount);
    return currentCount;
}

function mapKeyToFunc(keyCode, func) {
    if (key === keyCode || key === keyCode.toLowerCase() ||  key === keyCode.toUpperCase()) {
        func();
    }
}

function printElapsedTime(callback) {
    let before = millis();
    callback();
    let after = millis();
    printTime(before, after);
}

function printTime(before, after) {
    print("before : " + before + ", ", 
          "after : " + after + ", ", 
          "after - before : " + (after - before) / 1000 + " s" );
}