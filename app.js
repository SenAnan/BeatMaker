// DOM ELEMENTS
const beatboxes = document.querySelectorAll('.beat-box');
const crashes = document.querySelectorAll('.crash');
const hihats = document.querySelectorAll('.hihat');
const snares = document.querySelectorAll('.snare');
const kicks = document.querySelectorAll('.kick');

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const restartButton = document.getElementById('restart');
const bpmInput = document.querySelector('.bpm');

const drumSounds = {
	crash: document.getElementById('crash'),
	hihat: document.getElementById('hihat'),
	snare: document.getElementById('snare'),
	kick: document.getElementById('kick'),
};

// GLOBAL VARIABLES
let isPlaying = false;
let musicTimer;
let beat = -1;
let bpm = 100;

// FUNCTIONALITY

// Highlights beat box on selection
const selectBeat = (e) => {
	e.target.classList.toggle('filled');
};
beatboxes.forEach((el) => {
	el.addEventListener('click', selectBeat);
});

// Start and stops the timer
const toggleBeats = (e) => {
	e.target.textContent = isPlaying ? 'START' : 'STOP';
	e.target.classList.toggle('red-text');
	if (isPlaying) {
		clearInterval(musicTimer);
	} else {
		playBeats();
	}
	isPlaying = !isPlaying;
};
startButton.addEventListener('click', toggleBeats);

// Timer based on BPM input
const playBeats = () => {
	musicTimer = setInterval(moveBeat, (60 / bpm) * 1000);
};

// Highlights current beat and plays sounds of those selected
const moveBeat = () => {
	if (beat != -1) {
		let onBeat = [crashes[beat], hihats[beat], snares[beat], kicks[beat]];
		onBeat.forEach((el) => {
			el.classList.remove('onBeat');
		});
	}
	beat = beat == 7 ? 0 : beat + 1;
	onBeat = [crashes[beat], hihats[beat], snares[beat], kicks[beat]];
	onBeat.forEach((el) => {
		el.classList.add('onBeat');
		if (el.classList.contains('filled')) {
			drumSounds[el.dataset.drum].pause();
			drumSounds[el.dataset.drum].currentTime = 0;
			drumSounds[el.dataset.drum].play();
		}
	});
};

// Restarts beat counter to beginning
const restartBeats = () => {
	if (beat != -1) {
		let onBeat = [crashes[beat], hihats[beat], snares[beat], kicks[beat]];
		onBeat.forEach((el) => {
			el.classList.remove('onBeat');
		});
	}
	beat = -1;
};
restartButton.addEventListener('click', restartBeats);

// Resets board
const resetBeats = () => {
	beatboxes.forEach((el) => {
		el.classList.remove('filled');
	});
	restartBeats();
	bpmInput.value = 100;
};
resetButton.addEventListener('click', resetBeats);

// Change bpm from input
bpmInput.addEventListener('change', (e) => {
	if (e.target.value < 40 || e.target.value > 200) {
		alert('Please specify bpm between 40 and 200 only');
		e.target.value = bpm;
		return;
	}
	bpm = e.target.value;
	if (isPlaying) {
		clearInterval(musicTimer);
		playBeats();
	}
});

// Respond to keyboard input
bpmInput.addEventListener('keyup', (e) => {
	bpm = e.target.value;
	if (isPlaying) {
		clearInterval(musicTimer);
		playBeats();
	}
});
