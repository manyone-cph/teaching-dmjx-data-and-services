import { ref, onMounted, onUnmounted, watch } from "vue";
import { useGameStore, GameState } from '../stores/gameStore';
import { useScoreStore } from "../stores/scoreStore";
import { usePlayerStore } from "../stores/playerStore";
import { useObstacleStore } from '../stores/obstacleStore';
import { playSound } from '../game/soundManager.js'

// Encapsulate game loop functionality as a composable for vue
export function useGameLoop() {
  const gameStore = useGameStore();
  const scoreStore = useScoreStore();
  const playerStore = usePlayerStore();
  const obstacleStore = useObstacleStore();
  const requestId = ref(null);
  const obstacleInterval = ref(null);

  function gameLoop() {
    // STATES: Update stores
    gameStore.update();
    playerStore.update();
    obstacleStore.update(gameStore.speed);

    // COLLISION: Collision detection between player and obstacles
    const player = {
      x: playerStore.xPos, // Assuming player's X position is constant
      y: playerStore.yPos,
      width: playerStore.width, // Define the player's width
      height: playerStore.height // Define the player's height
    };

    if(obstacleStore.evaluateCollision(player)) {
      gameStore.setState(GameState.GAME_OVER);
      playSound('hit');
    }

    // COLLISION: Floor (foreground) and player. Foreground is 112px in height
    if(playerStore.yPos + playerStore.height > window.innerHeight - 112) {
      gameStore.setState(GameState.GAME_OVER);
      playSound('hit');
    }

    // SCORE: update score as player passes obstacles
    obstacleStore.obstacles.forEach(obstacle => {
      if (obstacle.xPos + obstacle.width < playerStore.xPos && !obstacle.passed) {
        obstacle.passed = true; // Mark as passed so score is only incremented once per obstacle
        scoreStore.increment();
        playSound('score');
      }
    });

    // LOOP: If the game state is correct, we loop
    if(gameStore.gameState === GameState.GAME) {
      requestId.value = requestAnimationFrame(gameLoop);
    } else {
      requestId.value = null;
    }
  }

  function spawnObstacle() {
    if(gameStore.gameState === GameState.GAME) {
      obstacleStore.spawn();
    }
  }

  // Logic for when to start the game loop and obstacle spawner, based on game state
  function init() {
    watch(
      () => gameStore.gameState,
      (newState, oldState) => {
        switch (newState) {
          case GameState.INTRO:
            obstacleStore.reset();
            playerStore.reset();
            gameStore.reset();
            scoreStore.reset();
            // break; // We'll pass through here and stop the game loop
          case GameState.GAME_OVER:
          case GameState.GAME_PAUSED:
            stopGameLoop();
            break;
          case GameState.GAME:
            startGameLoop();
            break;
          default:
            break;
        }
      }
    );
  }

  function startGameLoop() {
    if (requestId.value === null) {
      gameLoop();
    }
    if (obstacleInterval.value === null) {
      obstacleInterval.value = setInterval(spawnObstacle, 1500);
    }
  }

  function stopGameLoop() {
    if (requestId.value !== null) {
      cancelAnimationFrame(requestId.value);
      requestId.value = null;
    }
    if (obstacleInterval.value === null) {
      clearInterval(obstacleInterval.value);
    }
  }

  // Automatically start the game loop when the composable is used in a component
  onMounted(() => {
    init();
  });

  // Automatically stop the game loop when the component using this composable is unmounted
  onUnmounted(() => {
    stopGameLoop();
  });

  return { startGameLoop, stopGameLoop };
}
