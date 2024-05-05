// Adapted from here: https://codepen.io/gregh/pen/RKVNgB

const notes = [
  196.0, // G
  220.0, // A
  246.94, // B
  261.63, // C
  293.66, // D
  329.63, // E
  349.23, // F
  392.0, // G
  440.0, // A
  493.88, // B
  523.25, // C
  587.33, // D
  659.25, // E
  698.46, // F
  783.99, // G
  880.0, // A
  987.77, // B
  1046.5, // C
];

class Sound {
  constructor(context) {
    this.context = context;
  }

  setup() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = "sine";
  }

  play(value) {
    this.setup();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

    this.oscillator.start(this.context.currentTime);
    this.stop(this.context.currentTime);
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
    this.oscillator.stop(this.context.currentTime + 1);
  }
}

let context;

export function playSound(index) {
    if(!context) {
        context = new (window.AudioContext || window.webkitAudioContext)();
    }

    let sound = new Sound(context);
    let value = notes[index % notes.length];
    sound.play(value);
    sound.stop();
}
