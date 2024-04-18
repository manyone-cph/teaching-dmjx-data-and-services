
<script setup>
import { usePlayerStore } from '../stores/playerStore';
import { GameState, useGameStore } from '../stores/gameStore';
import { computed } from 'vue';

const playerStore = usePlayerStore();
const gameStore = useGameStore();

const playerStyle = computed(() => ({
    top: `${playerStore.yPos}px`,
    left: `${playerStore.xPos}px`,
    width: `${playerStore.width}px`,
    height: `${playerStore.height}px`,
    transform: `rotate(${playerStore.velocity * 2}deg)`  // Multiplier adjusts sensitivity of rotation
  }));

  const isDead = computed(() => {
    return gameStore.gameState === GameState.GAME_OVER || gameStore.gameState === GameState.GAME_PAUSED
  });

</script>

<template>
    <div :class="{ player: true, dead: isDead }" :style="playerStyle">
        <!-- {{playerStore.yPos}} -->
    </div>
</template>
  
<style>
.player {
    position: absolute;
    width: 50px;
    height: 50px;
    background: url('/images/bird-sprite-sheet.png') left center;
    animation: play 0.35s steps(3) alternate infinite;
}

.dead {
    animation: none;
}

@keyframes play {
   100% { background-position: -102px; }
}
</style>