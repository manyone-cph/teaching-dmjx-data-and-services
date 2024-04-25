<template>
  <div class="module-teaser-courses" v-editable="blok">
    <div class="item">
      <div class="header">
        <h2>{{ blok.headline }}</h2>
      </div>

      <div class="courses">
        <div v-for="course in blok.courses" class="course" v-editable="course">
          <img :src="course.media.filename" :alt="course.media.alt" />
          <div class="course-text">
            <span>{{ course.startDate }}</span>
            <h3>{{ course.title }}</h3>
            <div class="course-price">Pris: {{ course.price }},-</div>
          </div>
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
.module-teaser-courses {
  padding: 4rem;

  h2 {
    font-size: var(--fz-headline-md);
  }

  h3 {
    font-size: var(--fz-headline-sm);
  }
}

.header {
  border-top: 1px solid currentColor;
  padding: 0.5rem 0;
}

.courses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.course {
  position: relative;
}

.course-text {
  position: absolute;
  bottom: 1rem;
  padding: 1rem;
  color: white;

  h3 {
    display: block;
  }
}

.course-price {
  display: inline-block;
  background-color: white;
  color: black;
  padding: 0.5rem;
}
</style>
