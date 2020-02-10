var ch = {
    mainColor: 0,
    voiceList: [],
    lastCircleCount: 0,
    gap: 50,
    sound: null,
    isAudioContextMessageVisible : true
};

function preload() {
    ch.sound = loadSound('assets/Conte- Sophie_Griffon.Mp3');
}

function setup() {

    const cnv = createCanvas(windowWidth, windowHeight);

    // creation of audio context management
    cnv.mouseClicked(function() {
        userStartAudio().then(function() {
          ch.isAudioContextMessageVisible = false;
      });
    });

    strokeWeight(1);
    noFill();
    ch.mainColor = color(255, 204, 0);
    // addVoice(0.5);
    // addVoice(1.2);
}

function draw() {
  background(ch.mainColor);
    
    if (ch.isAudioContextMessageVisible)
    {
        textAlign(CENTER);
        fill(50);
        textSize(50);
        text('click to start audio', windowWidth/2, windowHeight/2);
        noFill();
    }

    refreshVoiceList();
    updateVoiceList();
    drawVoiceList();
}

function mouseClicked() {
    ch.voiceList.forEach((voiceItem, i) => {
        console.log(voiceItem);
        console.log(`${i} : `, "voiceItem.offsetAmount : ", voiceItem.offsetAmount);
        console.log(`${i} : `, "voiceItem.offsetX : ", voiceItem.offsetX);
        console.log(`${i} : `, "voiceItem.speed : ", voiceItem.speed);
    });
}

function refreshVoiceList() {
    let circleCount = int(map(mouseX, 0, windowWidth, 0, 10)) + 1;
    let length = ch.voiceList.length;

    if (ch.lastCircleCount == circleCount) {
        return;
    }
    ch.lastCircleCount = circleCount;

    if (circleCount > length) {
        addVoice();
    } else {
        ch.voiceList[length - 1].sound.stop();
        ch.voiceList.splice(length - 1, 1);
    }

    console.log(ch.voiceList);
}

function addVoice() {
    let offsetAmount = int(map(mouseY, 0, windowHeight, 0, 50));
    ch.voiceList.push(
        new Voice(
            ch.mainColor,
            ch.gap * ch.voiceList.length + ch.gap,
            random(-offsetAmount, offsetAmount), // -50 to +50
            random(-offsetAmount, offsetAmount), // -50 to +50
        )
    );
}

function updateVoiceList() {
    ch.voiceList.forEach(voiceItem => {
        voiceItem.updateOffset();
        voiceItem.updatePitch();
    });
}

function drawVoiceList() {
    // if (ch.voiceList.length > 0) {
    //     ch.sound.rate(ch.voiceList[0].speed);
    // }
    ch.voiceList.forEach((voiceItem) => {
        circle(mouseX + voiceItem.offsetX * voiceItem.offsetAmount / 100, mouseY + voiceItem.offsetY * voiceItem.offsetAmount / 100, voiceItem.size);
    });
}

class Voice {
    constructor(color, size, offsetX, offsetY, speed = 1) {
        this.color = color;
        this.size = size;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetAmount = 0;
        
        this.speed = speed;
        this.sound = _.cloneDeep(ch.sound);

        this.sound.setVolume(1);
        this.sound.playMode("restart");
        this.sound.loop();
    }

    updatePitch() {
        if (this.offsetAmount > 0) {

            this.speed = 1 + (this.offsetX / 50) * this.offsetAmount / 100;

            console.log("speed : ", this.speed);
            console.log("this.offsetAmount : ", this.offsetAmount);
            // //this.speed = constrain(speed, 0.5, 1.5);
            this.sound.rate(this.speed);
        }
    }

    updateOffset() {  
        this.offsetAmount = int(map(mouseY, 0, windowHeight, 0, 100));
    }
}
