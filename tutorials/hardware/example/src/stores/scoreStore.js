import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', () => {
  const score = ref(0)
  const highscore = ref(JSON.parse(localStorage.getItem('highscore')) || 0);

  function increment() {
    score.value++

    // Update highscore if relevant
    if (score.value > highscore.value) {
      highscore.value = score.value;
      localStorage.setItem('highscore', JSON.stringify(highscore.value));
    }
  }

  function reset() {
    score.value = 0
  }

  return { score, highscore, increment, reset }
})
