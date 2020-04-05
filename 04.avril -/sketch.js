let param = {
    fontSizeMax: 15,
    fontSizeMin: 5,

    spacing: 9, // line height
    kerning: 0.2, // between letters
    
    divider: 1, // improve performance
    
    fontSizeStatic: false,
    blackAndWhite: false,
};

let data = {
    inputText: "pouet",
};

function preload() {
    data.img = loadImage('data/pop1.jpg');
  }

function setup() {
    createCanvas(data.img.width/param.divider,data.img.height/param.divider);
    textFont('Times');
    textSize(10);
    textAlign(LEFT, CENTER);
    print(data.img.width + ' • ' + data.img.height);
}

function draw() {
    background(255);

    var x = 0;
    var y = param.spacing;
    var textCounter = 0;
    
    while (y < height)
    {
        data.img.loadPixels();
        getCurrentColor(x, y);

        push();

        translate(x, y);
        drawPixel();
        let letterWidth = printLetterAtCounter(textCounter);
        x += letterWidth;

        pop();
        
        textCounter++;
        if (textCounter >= data.inputText.length) {
            textCounter = 0;
        }

        if (x + letterWidth >= width) {
            x = 0;
            y += param.spacing;
        }
    }    
    
    print(param);
    print(data);
    noLoop();
}

function getCurrentColor(x, y) {
    data.imgX = round(map(x, 0, width, 0, data.img.width));
    data.imgY = round(map(y, 0, height, 0, data.img.height));
    data.c = color(data.img.get(data.imgX, data.imgY));
    data.greyscale = round(red(data.c) * 0.222 + green(data.c) * 0.707 + blue(data.c) * 0.071);
}

function drawPixel() {
    // if (param.fontSizeStatic) {
    //     textSize(param.fontSizeMax);
    //     if (param.blackAndWhite) {
    //       fill(data.greyscale);
    //     } else {
    //       fill(data.c);
    //     }
    //   } else {
    //     // greyscale to fontsize
    var fontSize = map(data.greyscale, 0, 255, param.fontSizeMax, param.fontSizeMin);
    fontSize = max(fontSize, 1);
    textSize(fontSize);
    if (param.blackAndWhite) {
        fill(data.greyscale);
    } else {
        fill(data.c);
    }
    //   }
}

function printLetterAtCounter(textCounter) {
    var letter = data.inputText.charAt(textCounter);
    text(letter, 0, 0);
    return textWidth(letter) + param.kerning;
}