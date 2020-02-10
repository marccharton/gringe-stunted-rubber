var ch = {
	mainColor: 0,
	voiceList: [],
	lastCircleCount: 0,
	gap: 50,
	sound: null,
	isAudioContextMessageVisible : true
};

function preload() {
	ch.sound = loadSound('assets/Spooky Singing Choir.wav');
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
	ch.sound.setVolume(1);
  ch.sound.playMode("restart");
	ch.sound.play();
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

function refreshVoiceList() {
	let circleCount = int(map(mouseX, 0, windowWidth, 0, 10)) + 1;
	let length = ch.voiceList.length;

	if (ch.lastCircleCount == circleCount) {
		return;
	}
	ch.lastCircleCount = circleCount;

	if (circleCount > length) {
		addVoice(length);
	} else {
		ch.voiceList.splice(length - 1, 1);
	}

	console.log(ch.voiceList);
}

function addVoice(length) {
	let offsetAmount = int(map(mouseY, 0, windowHeight, 0, 100));
	ch.voiceList.push(
		new Voice(
			ch.mainColor,
			ch.gap * length + ch.gap,
			random(-offsetAmount / 2, offsetAmount / 2),
			random(-offsetAmount / 2, offsetAmount / 2)
		)
	);
}

function updateVoiceList() {
	ch.voiceList.forEach(voiceItem => {
        voiceItem.updatePitch();
	});
}

function drawVoiceList() {
    if (ch.voiceList.length > 0) {
        ch.sound.rate(ch.voiceList[0].speed);
    }
	ch.voiceList.forEach((voiceItem) => {
        circle(mouseX + voiceItem.offsetX, mouseY + voiceItem.offsetY, voiceItem.size);
	});
}

class Voice {
	constructor(color, size, offsetX, offsetY) {
		this.color = color;
		this.size = size;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
        this.speed = 1;
	}

    updatePitch() {
        let speed = map(mouseY, 0.1, height, 0, 2);
        this.speed = constrain(speed, 0.01, 4);
    }
}
