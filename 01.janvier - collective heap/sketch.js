var ch = {
    mainColor : 0,
    voiceList : [],
    lastCircleCount : 0,
    mailman : 20 // todo : change name
};

function setup(){
    createCanvas(windowWidth, windowHeight);
    ch.mainColor = color(255, 204, 0);
    noFill();
}

function draw(){
    refreshVoiceList();
    updateVoiceList();
    background(ch.mainColor);
    strokeWeight(1);
    ch.voiceList.forEach(voiceItem => {
        circle(mouseX + voiceItem.offset, mouseY + voiceItem.offset, voiceItem.size);
    });
}

function updateVoiceList() {
    ch.voiceList.forEach(voiceItem => {
        let offsetAmount = int(map(mouseY, 0, windowHeight, 0, 50));
        voiceItem.offset = random(5, 5 + offsetAmount);
    });
    //console.log(ch.voiceList[0].offset);
}

function refreshVoiceList() {
    // c'est trop le bordel !! 
    // il faut : une phase création, une phase update, une phase draw.

    let circleCount = int(map(mouseX, 0, windowWidth, 0, 10)) + 1;
    let length = ch.voiceList.length;

    if (ch.lastCircleCount == circleCount) {
        return;
    }

    ch.lastCircleCount = circleCount;

    let offsetAmount = int(map(mouseY, 0, windowHeight, 0, 10));
    let offset = random(5, 5 + offsetAmount);
    if (circleCount > length) {
        ch.voiceList.push(new Voice(ch.mainColor, ch.mailman * length + 10, offset));
    }
    else {
        ch.voiceList.splice(length - 1, 1)
    }

    console.log(ch.voiceList);
    
}


class Voice {
    constructor(color, size, offset){
        this.color = color;
        this.size = size;
        this.offset = offset;
    }
}