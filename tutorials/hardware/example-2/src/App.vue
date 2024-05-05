<script setup>
/**
 * This example was built in a single file, so it's not a good example of structuring your project with components and composables
 */
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import { playSound } from "./soundPlayer";

const words = ref(['']); // Start with an empty array
const currentWord = ref(-1);
const delays = Array.from({ length: 10 }, () => `${(Math.random() * -0.5).toFixed(3)}s`);
const cursor = ref(null)
const colors = [
  "#FFF4B4",
  "#FFCCF4",
  "#FCC9BD",
  "#B4B5FF",
  "#C0B0B1",
  "#DCD9E0"
]
const mouseData = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
  deltaX: 0,
  deltaY: 0,
  lastDeltaX: 0,
  lastDeltaY: 0,
  dot: 1,
};
const shakeCounter = ref(0);
const maxCount = 6;
const counterClearInterval = 175;//ms
const shakeScale = ref(0); // Only reactive because I wanted to debug it in the dom.
const maxShakeScale = 5;
const shakeShuffleDelay = 1000;
const shakeScaleSmoothness = 0.95; // keep between 0 and 1
const isShaking = computed(() => shakeCounter.value > 3); // TODO: Prevent flickering by adding a dead zone in the middle
const isSpeaking = ref(false);
let requestId = null;
let intervalId = null;
let shakeTimeoutId = null;

shuffle(colors); // Random order colors for words each time. 

function reset() {
  words.value = [''];  // Reset words to an initial state with an empty string
  currentWord.value = -1;
  document.body.focus();
}

function speakWords() {
  if(currentWord.value >= 0 && currentWord.value < words.value.length) {
    speak(words.value[currentWord.value], true);
    return;
  }

  speak(words.value.join(' '));
  document.body.focus();
}

function speakCurrentWord() {
  if(currentWord.value >= 0 && currentWord.value < words.value.length) {
    speak(words.value[currentWord.value], true);
  }
}

function speak(text, force = false) {
  const synth = window.speechSynthesis;
  if (synth.speaking && !force) {
    synth.cancel(); // This will stop the speech synthesis
    isSpeaking.value = false;
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.onend = (() => {
    console.log("onend")
    isSpeaking.value = false;
  });

  utterance.onerror = ((event) => {
    console.log("error", event)
    isSpeaking.value = false;
  });

  synth.speak(utterance);
  isSpeaking.value = true;
}

function shuffleWords() {
  if (words.value.length > 1) {
    words.value = words.value.filter(word => word !== '');
  }

  shuffle(words.value); // Pass the reactive array reference to the shuffle function
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring assignment for swapping
  }
}

function handleKeyDown(event) {
  if ((event.key === 'Enter' || event.key === ' ' || event.key === ',') && words.value[words.value.length - 1].length > 0) {
    words.value.push('');
  } else if (event.key === 'Backspace') {
    if (words.value.length > 0 && words.value[words.value.length - 1].length > 0) {
      words.value[words.value.length - 1] = words.value[words.value.length - 1].slice(0, -1); // Remove last character
    } else if (words.value.length > 1) {
      words.value.pop(); // Remove last empty word.
    }
  } else if (event.key === 'ArrowRight') {
    if (currentWord.value < words.value.length - 1) {
      currentWord.value++;
    } else {
      currentWord.value = -1;
    }
  } else if (event.key === 'ArrowLeft') {
    if (currentWord.value > -1) {
      currentWord.value--;
    }
  } else if (event.key.length === 1) {
    words.value[words.value.length - 1] += event.key;
    playSound(event.keyCode);
    window.scrollTo(0, document.body.scrollHeight);
  }
}

function handleMouseMove(event) {
  mouseData.x = event.clientX;
  mouseData.y = event.clientY;
}

function update() {
  // current delta
  mouseData.deltaX = mouseData.x - mouseData.lastX;
  mouseData.deltaY = mouseData.y - mouseData.lastY;

  // diff in movement
  mouseData.diffX = mouseData.deltaX - mouseData.lastDeltaX;
  mouseData.diffY = mouseData.deltaY - mouseData.lastDeltaY;

  const deltaLength = Math.sqrt(mouseData.deltaX * mouseData.deltaX + mouseData.deltaY * mouseData.deltaY);
  const lastDeltaLength = Math.sqrt(mouseData.lastDeltaX * mouseData.lastDeltaX + mouseData.lastDeltaY * mouseData.lastDeltaY);

  if (deltaLength > 0 & lastDeltaLength > 0) {
    // Normalized direction
    const dirX = mouseData.deltaX / deltaLength;
    const dirY = mouseData.deltaY / deltaLength;
    const lastDirX = mouseData.lastDeltaX / lastDeltaLength;
    const lastDirY = mouseData.lastDeltaY / lastDeltaLength;

    // Difference between current direction and previous direction
    mouseData.dot = dirX * lastDirX + dirY * lastDirY;

  } else {
    mouseData.dot = 1;
  }
  // console.log(mouseData.dot.toFixed(1))
  if (mouseData.dot < 0) {
    // console.log("Direction swap");
    if (shakeCounter.value < maxCount) {
      shakeCounter.value++;
    }
  }

  // lerp towards a value. if isShaking is true, that value is 'maxShakeScale', else it is 0. Lerp speed is determined by 'shakeScaleSmoothness'
  shakeScale.value = shakeScale.value * shakeScaleSmoothness + (isShaking.value ? maxShakeScale : 0) * (1 - shakeScaleSmoothness);
  updateShakeScale(shakeScale.value);

  // For next frame
  mouseData.lastX = mouseData.x;
  mouseData.lastY = mouseData.y;

  mouseData.lastDeltaX = mouseData.deltaX;
  mouseData.lastDeltaY = mouseData.deltaY;

  requestId = requestAnimationFrame(update);
}

function decrementShakeCounter() {
  if (shakeCounter.value > 0) {
    shakeCounter.value--;
  }
}

function updateShakeScale(newScale) {
  let rounded = Math.round(newScale * 100) / 100.0;
  document.documentElement.style.setProperty('--shake-scale', rounded);
}

/* WATCHERS */
watch(isShaking, (newValue) => {
  if (newValue === true) {
    clearTimeout(shakeTimeoutId); // Clear existing timeout first
    shakeTimeoutId = setTimeout(() => {
      shuffleWords();
      shakeCounter.value = 0;
      currentWord.value = -1;
    }, shakeShuffleDelay); // Set timeout for 2 seconds
  } else if (newValue === false) {
    clearTimeout(shakeTimeoutId);
  }
});

watch(words, (newValue) => {
  localStorage.setItem('words', JSON.stringify(newValue));
}, { deep: true });

watch(currentWord, (newValue) => {
  speakCurrentWord(newValue);
});

/* LIFECYCLE */
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('mousemove', handleMouseMove);
  setInterval(decrementShakeCounter, counterClearInterval);
  const storedWords = localStorage.getItem('words');
  if (storedWords) {
    words.value = JSON.parse(storedWords);
  }
  update();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('mousemove', handleMouseMove);
  if (requestId !== null) {
    cancelAnimationFrame(requestId);
    requestId.value = null;
  }
  clearInterval(intervalId);
  clearTimeout(shakeTimeoutId);
});
</script>

<template>
  <main>
    <div class="word-container">
      <button @keydown.prevent v-if="!(words.length === 1 && words[0] === '')" @click="reset"
        style="--color: #F5827A;">Reset</button>
      <button @keydown.prevent v-if="!(words.length === 1 && words[0] === '')" @click="speakWords"
        style="--color: #FFEC7E;" :style="{ 'textDecoration': isSpeaking ? 'line-through' : 'none' }">Speak</button>
      <span @keydown.prevent @click="currentWord = index" v-for="(word, index) in words" :key="index" class="word shaking selectable" :class="{ selected : currentWord === index}"
        :style="{ '--delay': delays[index % delays.length], '--color': colors[index % colors.length] }">
        <span v-for="(char, charIndex) in word" :key="`${index}-${charIndex}`" class="char shaking">
          {{ char }}
        </span>
        <span v-if="index < words.length - 1" class="delimiter">, </span>
      </span>
      <span ref="cursor" class="shaking word cursor-wrapper">x<span class="cursor char"
          :style="{ '--color': colors[(words.length - 1) % colors.length] }"></span></span>
      <span v-if="words.length === 1 && words[0] === ''" class="word char hint">type...</span>
    </div>
  </main>
</template>

<style>

/* .word-container {
} */

.word {
  position: relative;
  display: inline-block;
  color: var(--color);
}

.selectable {
  cursor: pointer;
}

.word.selected span.char{
  text-decoration: underline;
}

.char {
  display: inline-block;
}

.delimiter {
  display: inline-block;
  margin-right: 2vw;
}

.hint {
  opacity: 0.35;
}

.cursor-wrapper {
  color: transparent;
}

.cursor {
  position: absolute;
  color: white;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  animation: blink-animation 1s infinite;
}

@keyframes blink-animation {

  0%,
  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.shaking {
  animation-name: shake;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-delay: var(--delay);
}

/* https://www.dayaweb.com/blog/css-text-animation-shake/ */
@keyframes shake {
  0% {
    transform: translate(calc(0.025rem * var(--shake-scale)), calc(0.025rem * var(--shake-scale))) rotate(calc(0deg * var(--shake-scale)));
  }

  10% {
    transform: translate(calc(-0.025rem * var(--shake-scale)), calc(-0.05rem * var(--shake-scale))) rotate(calc(-2deg * var(--shake-scale)));
  }

  20% {
    transform: translate(calc(-0.075rem * var(--shake-scale)), calc(0rem * var(--shake-scale))) rotate(calc(2deg * var(--shake-scale)));
  }

  30% {
    transform: translate(calc(0.075rem * var(--shake-scale)), calc(0.05rem * var(--shake-scale))) rotate(calc(0deg * var(--shake-scale)));
  }

  40% {
    transform: translate(calc(0.025rem * var(--shake-scale)), calc(-0.025rem * var(--shake-scale))) rotate(calc(2deg * var(--shake-scale)));
  }

  50% {
    transform: translate(calc(-0.025rem * var(--shake-scale)), calc(0.05rem * var(--shake-scale))) rotate(calc(-2deg * var(--shake-scale)));
  }

  60% {
    transform: translate(calc(-0.075rem * var(--shake-scale)), calc(0.025rem * var(--shake-scale))) rotate(calc(0deg * var(--shake-scale)));
  }

  70% {
    transform: translate(calc(0.075rem * var(--shake-scale)), calc(0.025rem * var(--shake-scale))) rotate(calc(-2deg * var(--shake-scale)));
  }

  80% {
    transform: translate(calc(-0.025rem * var(--shake-scale)), calc(-0.025rem * var(--shake-scale))) rotate(calc(2deg * var(--shake-scale)));
  }

  90% {
    transform: translate(calc(0.025rem * var(--shake-scale)), calc(0.05rem * var(--shake-scale))) rotate(calc(0deg * var(--shake-scale)));
  }

  100% {
    transform: translate(calc(0.025rem * var(--shake-scale)), calc(-0.05rem * var(--shake-scale))) rotate(calc(-2deg * var(--shake-scale)));
  }
}</style>
