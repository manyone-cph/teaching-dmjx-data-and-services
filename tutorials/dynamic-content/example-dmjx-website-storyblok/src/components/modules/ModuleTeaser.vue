<template>
  <div
    class="module-teaser"
    :class="{ single: blok.items.length === 1 }"
    :style="{
      '--bg-color': blok.backgroundColor?.color || 'white',
      '--text-color': blok.textColor?.color || 'black',
    }"
    v-editable="blok"
  >
    <div v-for="(item, idx) in blok?.items" class="item" v-editable="item">
      <div class="item-content">
        <img :src="item.media.filename" :alt="item.media.alt" />
        <div class="item-text">
          <div v-if="idx === 0" class="header">
            <span>{{ blok.headline }}</span>
          </div>

          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blok: Object,
});
</script>

<style scoped>
.module-teaser {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  padding: 4rem;
  background-color: var(--bg-color);
  color: var(--text-color);

  &.single {
    grid-template-rows: repeat(4, 1fr);
  }
}

.header {
  border-top: 1px solid currentColor;
  padding: 0.5rem 0;
}

.item {
  display: grid;
  grid-template-columns: subgrid;
  /* background-color: lightcyan; */

  & .item-content {
    grid-column: span 2;
  }

  & img {
    width: 100%;
  }
}

.item:nth-child(1) {
  grid-area: 1 / 1 / 5 / 5;

  .item-content {
    grid-column: span 4;

    display: grid;
    grid-template-columns: subgrid;

    & img {
      grid-column: span 2;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .item-text {
      grid-column: span 2;
    }
  }

  h2 {
    font-size: var(--fz-headline-lg);
  }
}

.item:nth-child(2) {
  grid-area: 5 / 1 / 8 / 2;

  h2 {
    font-size: var(--fz-headline-sm);
    margin-top: 0.5rem;
  }
}

.item:nth-child(3) {
  grid-area: 5 / 2 / 8 / 3;

  h2 {
    font-size: var(--fz-headline-sm);
    margin-top: 0.5rem;
  }
}

.item:nth-child(4) {
  grid-area: 4 / 3 / 8 / 5;

  h2 {
    font-size: var(--fz-headline-md);
    margin-top: 0.5rem;
  }
}
</style>
