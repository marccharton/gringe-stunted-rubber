
let variables = {
    x: 0,
    y: 0,
};
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
        
        pixelizr.init({
            ...options,
            imgSource : data.img    
        });
        pixelizr.setup();
        startedTime = millis();
    },

    draw() {
        if (variables.x >= width + options.gridX) {
            noLoop();
            variables.x = 0
            variables.y = 0
            
            printTime(startedTime, millis());
        }
        if (variables.y >= height  + options.gridY) {
            variables.y = 0;
            variables.x += options.gridX;
        }

        
        const effectiveSpace = pixelizr.draw(variables.x, variables.y);
        variables.y += effectiveSpace.height;
        
        
       // options.gridX = map(mouseX, 0, width, 20, 50);
    },

    keyReleased() {

        mapKeyToFunc("s", () => {
            const currentCount = saveSnapShotLocally(param.imageName);
            const fileName = `${param.imageName}_${currentCount}`;
            saveCanvas(fileName, 'png');
        });
        
        mapKeyToFunc("r", () => {
            const key = `${param.imageName}RendersCount`;
            localStorage.removeItem(key);
        });
    }
};

function saveSnapShotLocally(imageName) {
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
          "after - before : " + (after - before));
}