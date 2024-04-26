<template>
  <header>
    <div class="top-bar">
      <span class="logo">DMJX</span>
      <nav>
        <a>Find medarbejder</a>
        <a>International</a>
      </nav>
    </div>
    <div class="nav-bar">
      <nav>
        <a>Uddannelser</a>
        <a>Kurser og videreuddannelser</a>
        <a>Forskning og udvikling</a>
      </nav>
      <nav>
        <a>Aktuelt</a>
        <a>Om DMJX</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStoryblokApi } from "@storyblok/vue";

const storyblokApi = useStoryblokApi();

const state = reactive({ story: null });

try {
  const { data } = await storyblokApi.get(`cdn/stories/config`, {
    version: "draft",
  });
  state.story = data.story;
} catch (error) {
  console.error(error);
}

const header = computed(() => state.story?.content?.header[0]);
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  border-bottom: 1px solid black;
  & nav {
    font-size: 0.8rem;
  }
}

.logo {
  font-size: 1.5rem;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
