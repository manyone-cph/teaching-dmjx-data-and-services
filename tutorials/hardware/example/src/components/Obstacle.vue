<template>
  <div class="obstacle" :style="obstacleStyle">
    <div class="top" :style="{ height: obstacle.topHeight + 'px' }">
      <div class="pipe-top"></div>
    </div>
    <div class="bottom" :style="{ height: obstacle.bottomHeight + 'px' }">
      <div class="pipe-top"></div>
    </div>
  </div>
</template>
  
<script setup>
import { computed } from 'vue';
import { useObstacleStore } from '@/stores/obstacleStore';

const props = defineProps({
  obstacleId: Number
});

const store = useObstacleStore();
const obstacle = computed(() => store.obstacles.find(o => o.id === props.obstacleId));

const obstacleStyle = computed(() => ({
  transform: `translateX(${obstacle.value.xPos}px)`
}));
</script>
  
<style>
.obstacle {
  position: absolute;
  left: 0;
  width: 52px;
  height: 100%;
}

.top,
.bottom {
  width: 100%;
  position: absolute;

  background-image: url('/images/pipe.png');
  background-repeat: repeat-y;
}

.top {
  top: 0;
}

.bottom {
  bottom: 0;
}

.pipe-top {
  width: 100%;
  height: 26px;
  background-image: url('/images/pipe-top.png');
  position: absolute;
}

.top .pipe-top {
  transform: scaleY(-1);
  bottom: 0;
}
</style>