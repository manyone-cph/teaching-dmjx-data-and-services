
<script setup>
import { computed} from "vue";
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const foregroundOffset = computed(() => ({
  backgroundPosition: `${gameStore.scrollOffset}px 0`
}));
</script>

<template>
    <div class="foreground container" :style="foregroundOffset">
      Flappy bird learning project
    </div>
</template>
  
<style>
.foreground {
    height: 112px;
    top: auto;
    bottom: 0;
    background-image: url('/images/base.jpg');
    background-repeat: repeat-x;
    display: flex;
    justify-content: center;
    align-items: end;
    color: #d6a94e;
    padding-bottom: 40px;
    /* 2px 4px #543847, */
}
</style>
  @/stores/gameStore