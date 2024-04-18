// Simple audio manager
const soundPaths = {
  jump: "/audio/wing.mp3",
  score: "/audio/point.mp3",
  hit: "/audio/hit.mp3",
};

// Create Audio objects for each sound
const sounds = {
  jump: new Audio(soundPaths.jump),
  score: new Audio(soundPaths.score),
  hit: new Audio(soundPaths.hit),
};

// Preloading sounds to reduce delay when they're played
Object.values(sounds).forEach((sound) => {
  sound.preload = "auto";
  sound.volume = 0.25;
});

export function playSound(soundKey) {
  if (sounds[soundKey]) {
    sounds[soundKey].currentTime = 0; // Rewind to the start
    sounds[soundKey].play();
  }
}
