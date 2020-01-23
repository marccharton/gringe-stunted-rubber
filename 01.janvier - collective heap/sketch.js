var ch = {
    mainColor : 0,
    voiceList : [],
    lastCircleCount : 0,
    gap : 50,
    sound: null
};

function preload() {
    ch.sound = loadSound("assets/Spooky Singing Choir.wav");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    ch.mainColor = color(255, 204, 0);
    ch.sound.setVolume(1);
    ch.sound.play();
    noFill();
}

function draw(){
    refreshVoiceList();
    updateVoiceList();
    background(ch.mainColor);
    strokeWeight(1);
    drawVoiceList();
}

function drawVoiceList() {
    ch.voiceList.forEach(voiceItem => {
        circle(mouseX + voiceItem.offsetX, mouseY + voiceItem.offsetY, voiceItem.size);
    });
}

function updateVoiceList() {
    // ch.voiceList.forEach(voiceItem => {
    // });
}

function refreshVoiceList() {
    let circleCount = int(map(mouseX, 0, windowWidth, 0, 10)) + 1;
    let length = ch.voiceList.length;

    if (ch.lastCircleCount == circleCount) { return; }
    ch.lastCircleCount = circleCount;

    if (circleCount > length) {
        addVoice(length);
    }
    else {
        ch.voiceList.splice(length - 1, 1)
    }

    console.log(ch.voiceList);
}

function addVoice(length) {
    let offsetAmount = int(map(mouseY, 0, windowHeight, 0, 100));
    ch.voiceList.push(new Voice(ch.mainColor, 
                                ch.gap * length + ch.gap, 
                                random(-offsetAmount/2, offsetAmount/2),
                                random(-offsetAmount/2, offsetAmount/2)
                    ));
}

class Voice {
    constructor(color, size, offsetX, offsetY){
        this.color = color;
        this.size = size;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
}