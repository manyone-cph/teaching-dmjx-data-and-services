<template>
  <div
    class="module-teaser-text"
    :style="{
      '--bg-color': blok.backgroundColor?.color || 'white',
      '--text-color': blok.textColor?.color || 'black',
    }"
    v-editable="blok"
  >
    <div class="item">
      <div class="header">
        <span>{{ blok.headline }}</span>
      </div>

      <h2>{{ blok.items[0].title }}</h2>
      <p>{{ blok.items[0].description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blok: Object,
});
</script>

<style scoped>
.module-teaser-text {
  padding: 4rem;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.header {
  border-top: 1px solid currentColor;
  padding: 0.5rem 0;
}

.item {
  h2 {
    font-size: var(--fz-headline-lg);
  }
}
</style>
