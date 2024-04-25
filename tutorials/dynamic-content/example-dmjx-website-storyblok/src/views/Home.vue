<template>
  <div>
    Home:
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
import { useStoryblokApi } from "@storyblok/vue";

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories/home", {
  version: "draft",
});
</script>

<style lang="scss" scoped></style>
