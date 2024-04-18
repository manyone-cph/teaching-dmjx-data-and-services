// stores/ObstacleStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useObstacleStore = defineStore("obstacle", () => {
  const obstacles = ref([]);
  const obstacleWidth = 50; // Width of an obstacle
  const obstacleGap = 150; // Vertical gap between upper and lower parts of the obstacle

  function spawn() {
    const screenHeight = window.innerHeight; // Height of the game area
    const availableHeight = screenHeight - 112; // Subtract foreground height here. TODO: Should not be hardcoded
    const screenWidth = window.innerWidth; // Width of the game area

    const minHeight = 20; // Minimum height of the top part of the obstacle
    const maxHeight = availableHeight - obstacleGap - minHeight; // Maximum height of the top part
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    const bottomHeight = availableHeight - topHeight - obstacleGap;

    const newObstacle = {
      id: Date.now(),
      topHeight,
      bottomHeight,
      xPos: screenWidth,
      width: obstacleWidth, 
      bottomYPos: availableHeight - bottomHeight, // FOR DEV
    };

    obstacles.value.push(newObstacle);

    // Remove obstacles that have moved off screen to the left
    obstacles.value = obstacles.value.filter((obstacle) => obstacle.xPos + obstacleWidth > 0);
  }

  function update(speed) {
    obstacles.value.forEach((obstacle) => {
      obstacle.xPos -= speed;
    });
  }

  function reset() {
    obstacles.value = [];
  }

  function evaluateCollision(player) {
    const screenHeight = window.innerHeight; // Height of the game area
    const availableHeight = screenHeight - 112; // subtract foreground

    for (let obstacle of obstacles.value) {
      let obstacleTop = {
        x: obstacle.xPos,
        y: 0,
        width: obstacleWidth,
        height: obstacle.topHeight,
      };

      let obstacleBottom = {
        x: obstacle.xPos,
        y: availableHeight - obstacle.bottomHeight,
        width: obstacleWidth,
        height: obstacle.bottomHeight,
      };

      // Check if the player overlaps with either top or bottom part of the obstacle
      if (intersect(player, obstacleTop) || intersect(player, obstacleBottom)) {
        return true;
      }
    }

    return false;
  }

  // Lots of intersection functions available online, not sure where I found this one. CodePilot/CHatGPT can probably aslo write this for you
  function intersect(r1, r2) {
    const AisToTheRightOfB = r1.x > r2.x + r2.width;
    const AisToTheLeftOfB = r1.x + r1.width < r2.x;
    const AisAboveB = r1.y + r1.height < r2.y;
    const AisBelowB = r1.y > r2.y + r2.height;
    
  return !(AisToTheRightOfB
    || AisToTheLeftOfB
    || AisAboveB
    || AisBelowB);
  }

  return { obstacles, spawn, update, reset, evaluateCollision };
});
