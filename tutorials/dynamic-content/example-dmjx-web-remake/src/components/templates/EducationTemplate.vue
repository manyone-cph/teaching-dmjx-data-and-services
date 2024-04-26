<template>
  <div class="education-template">
    <!-- Education template
    <pre>{{ blok }}</pre> -->
    <div class="hero">
      <img :src="blok.media.filename" alt="Education" />
      <div class="hero-text">
        <span>{{ blok.name }}</span>
        <h1>{{ blok.headline }}</h1>
      </div>
    </div>
    <article class="content">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo deserunt eaque praesentium veritatis asperiores
        culpa ipsum eum laudantium cum eos perspiciatis repellat rem, velit facilis impedit eius magnam excepturi
        quidem!
      </p>
    </article>
  </div>
</template>

<script setup>
defineProps({
  blok: Object,
});
</script>

<style scoped>
.education-template {
  & h1 {
    font-size: 4rem;
  }

  & .hero {
    position: relative;
    min-height: 80vh;
    padding: 4rem 4rem;
    display: flex;
    align-items: flex-end;
  }

  & .hero img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .hero-text {
    position: relative;
    color: white;
    & * {
      display: block;
    }
  }

  & .content {
    padding: 4rem;
  }
}
</style>
