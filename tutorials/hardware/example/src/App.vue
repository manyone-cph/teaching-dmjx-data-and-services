<script setup>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useGameStore, GameState } from './stores/gameStore';
import { useScoreStore } from './stores/scoreStore';
import { usePlayerStore } from './stores/playerStore';
import { useObstacleStore } from './stores/obstacleStore';
import { useGameLoop } from './game/gameLoop';
import Player from './components/Player.vue';
import Foreground from './components/Foreground.vue';
import Obstacle from './components/Obstacle.vue';

const obstacleStore = useObstacleStore();
const gameStore = useGameStore();
const scoreStore = useScoreStore();
const playerStore = usePlayerStore();

useGameLoop();

const touchFlag = ref(false);

const backgroundOffset = computed(() => ({
  backgroundPosition: `${gameStore.scrollOffset * 0.25}px bottom` // Use the reactive offsetX for position
}));

function handleJump() {
  if (gameStore.gameState === GameState.GAME) {
    playerStore.jump();
  } else if (gameStore.gameState === GameState.INSTRUCTIONS) {
    gameStore.setState(GameState.GAME)
    playerStore.jump(); // also do a jump to give users feedback on the mechanic
  }
}

// Listen for spacebar presses to make the player jump
function handleKeyPress(event) {
  // We only listen to space key, so early out if it is not
  if (event.code !== 'Space') {
    return;
  }

  handleJump();
}

// Touch also triggers a jump (for mobile)
function handleTouchStart(event) {
  handleJump();
}

onMounted(() => {
  playerStore.reset()
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

</script>

<template>
  <div class="game container" @touchstart="handleTouchStart">
    <div class="background container" :style="backgroundOffset"></div>
    <div class="obstacles container">
      <Obstacle v-for="obstacle in obstacleStore.obstacles" :key="obstacle.id" :obstacleId="obstacle.id" />
    </div>
    <Foreground />
    <div class="player-wrapper container">
      <Player />
    </div>
    <div class="ui">
      <div class="ui-top">
        <p v-if="gameStore.gameState !== GameState.GAME_OVER" class="score">{{ scoreStore.score }}</p>
      </div>
      <div class="ui-middle">
        <img v-if="gameStore.gameState === GameState.INTRO" src="/images/title.png" />
        <img v-if="gameStore.gameState === GameState.INSTRUCTIONS" src="/images/message.png" />
        <img v-if="gameStore.gameState === GameState.GAME_OVER" src="/images/gameover.png" />
        <div v-if="gameStore.gameState === GameState.GAME_OVER" class="score-board">
          <p class="score">Score: {{ scoreStore.score }}</p>
          <p class="score">Best: {{ scoreStore.highscore }}</p>
        </div>
      </div>
      <div class="ui-bottom">
        <button v-if="gameStore.gameState === GameState.INTRO"
          @click.stop="gameStore.setState(GameState.INSTRUCTIONS)">Start</button>
        <button v-if="gameStore.gameState === GameState.GAME_OVER"
          @click.stop="gameStore.setState(GameState.INTRO)">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.ui-dev {
  display: flex;
  justify-content: center;
}

.debug {
  text-align: right;
}

.ui {
  display: flex;
  flex-direction: column;
  z-index: 200;
  position: relative;
  height: 100%;
}
.ui-middle {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ui-middle>* {
  align-self: center;
}

.ui-top,
.ui-bottom {
  /* height: 60px; */
  display: flex;
  padding: 20px;

  justify-content: center;
}
.ui-bottom {
  padding-bottom: 140px;
}

.score {
  font-size: 1.5rem;
  color: white;
  /* -webkit-text-stroke: 2px  #543847; */
  text-shadow: 2px 2px 0 #543847, -2px -2px 0 #543847, -2px 2px 0 #543847, 2px -2px 0 #543847;
  margin-bottom: 25px;
}

.score-board {
  padding: 50px;
  padding-bottom: 0px;
  padding-top: 25px;
  margin-top: 25px;

  background-color: #ddd896;
  /* Main color of the div */
  border: solid 6px #ddd896;
  /* Lighter border color */
  /* Giving the div an elevated border with highlighst and shadows */
  box-shadow:
    inset -2px -2px #eae9d9,
    /* Bottom inner border */
    inset 2px 2px #d6a94e,
    2px 4px #543847,
    -2px 4px #543847,
    2px -2px #543847,
    -2px -2px #543847
    /* Soft outer shadow for lifted effect */
}

.obstacles {
  /* matches foreground height */
  bottom: 112px;
}

.background {
  /* matches foreground height */
  bottom: 112px;
  background: url('images/background-day.jpg'), #4ec0ca;
  background-repeat: repeat-x;
  background-position: left bottom;
}

button {
  font-family: "Press Start 2P", system-ui;
  /* font-family: "flappy-bird", system-ui; */
  background-color: #e96100;
  border: 2px solid white;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8rem;
  min-width: 100px;
  text-align: center;
  padding: 8px;
  box-shadow: 0px 2px 0 4px #543847;
}</style>
./stores/gameStore./stores/obstacleStore./stores/scoreStore