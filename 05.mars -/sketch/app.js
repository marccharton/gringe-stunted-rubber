
let variables = {};
let data = {};

let app = {
    preload() {
        data.img = loadImage(`${param.imagePath}/${param.imageName}.${param.imageExtension}`);
    },

    setup() {
        const key = `${param.projectName}RendersCount`;

        createCanvas(data.img.width*param.multiplier,data.img.height*param.multiplier).parent("container");
        print(data.img.width + ' • ' + data.img.height);
        
        if (param.darkBackground) {
            background(0);
        } else {
            background(255);
        }
        ellipseMode(CENTER);
        rectMode(CENTER);

        variables.x = 0;
        variables.y = 0;

        noStroke();    
        data.img.loadPixels();
    },

    draw() {
        const effectiveSpace = pixelizr.draw(variables.x, variables.y);
        variables.y += effectiveSpace.height;
    
        if (variables.y >= height) {
            variables.y = 0;
            variables.x += param.gridX;
        }
        if (variables.x >= width) {
            noLoop();
            print(param);
            print(data);
            variables.x = 0
            variables.y = 0
        }
       // param.gridX = map(mouseX, 0, width, 20, 50);
    },

    keyReleased() {
        if (key == 's' || key == 'S') {
            const key = `${param.imageName}RendersCount`;
            const previousCount = localStorage.getItem(key);
            let currentCount = previousCount === null ? 0 : int(previousCount) + 1;
            const fileName = `${param.imageName}_${currentCount}`;
            
            localStorage.setItem(key, currentCount);
            saveCanvas(fileName, 'png');
        }
        
        if (key == 'r' || key == 'R') {
            const key = `${param.imageName}RendersCount`;
            localStorage.removeItem(key);
        }
    }
};

function printElapsedTime(callback) {
    let before = millis();
    callback();
    let after = millis();
    print("before : " + before + ", ", 
          "after : " + after + ", ", 
          "after - before : " + (after - before));
}