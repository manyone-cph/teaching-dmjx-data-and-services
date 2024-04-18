import { ref, computed} from "vue";
import { defineStore } from "pinia";

export const GameState = {
  INTRO: "intro",
  INSTRUCTIONS: "instructions", // Waiting for user to do the first jump
  GAME: "game",
  GAME_PAUSED: "pause-game",
  GAME_OVER: "game-over",
};

export const useGameStore = defineStore("game", () => {
  const gameState = ref(GameState.INTRO);
  const baseSpeed = ref(3);
  const scrollOffset = ref(0); // sidescrolling distance

  function setState(state) {
    gameState.value = state;
    //Depending on state, we reset some vars
    if(state === GameState.INTRO) {
      scrollOffset.value = 0;
    }
  }

  const speed = computed(() => {
    if (gameState.value === 'game') {
      return baseSpeed.value;
    }
    return 0;
  });

  function update() {
    scrollOffset.value -= speed.value;
  }

  function reset() {
    
  }

  function setSpeed(newSpeed) {
    baseSpeed.value = newSpeed;
  }

  return { speed, setSpeed, gameState, setState, update, scrollOffset, reset };
});
