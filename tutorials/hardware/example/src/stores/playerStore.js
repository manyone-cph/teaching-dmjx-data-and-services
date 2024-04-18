import { ref } from 'vue';
import { defineStore } from 'pinia';
import { playSound } from '../game/soundManager.js'

export const usePlayerStore = defineStore('player', () => {
  const yPos = ref(300); // Starting vertical position
  const xPos = ref(50); // Starting vertical position
  const width = ref(34); // Starting vertical position
  const height = ref(24); // Starting vertical position
  const velocity = ref(0); // Starting velocity

  function jump() {
    velocity.value = -8;
    playSound('jump');
  }

  function update() {
    // Apply gravity
    velocity.value += 0.5;
    yPos.value += velocity.value;

    // Prevent player from falling below the ground
    if (yPos.value > window.innerHeight) {
      yPos.value = window.innerHeight;
      velocity.value = 0;
    }
  }

  function reset() {
    velocity.value = 0
    yPos.value = (window.innerHeight - 112) / 2; // 112 is the foreground height (the ground)
  }

  return { xPos, yPos, velocity, width, height, jump, update, reset };

})
