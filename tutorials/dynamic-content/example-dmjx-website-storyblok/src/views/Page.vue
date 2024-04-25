<template>
  <div v-if="!state?.story">Page not found</div>
  <div v-else>
    <!-- Page -->
    <!-- <pre>{{ route }}</pre> -->
    <!-- <pre>{{ route.path }}</pre> -->
    <!-- <pre>{{ data }}</pre> -->
    <!-- <pre>{{ data?.story?.name }}</pre> -->
    <!-- <pre>{{ data?.story?.content }}</pre> -->
    <!-- <pre>{{ state?.story?.content }}</pre> -->

    <PageTemplate v-if="state.story.content.component === 'PageTemplate'" :blok="state.story.content" />
    <EducationTemplate v-else-if="state.story.content.component === 'EducationTemplate'" :blok="state.story.content" />
    <ArticleTemplate v-else-if="state.story.content.component === 'ArticleTemplate'" :blok="state.story.content" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import { useRoute } from "vue-router";

import PageTemplate from "@/components/templates/PageTemplate.vue";
import EducationTemplate from "@/components/templates/EducationTemplate.vue";
import ArticleTemplate from "@/components/templates/ArticleTemplate.vue";

const route = useRoute();
const storyblokApi = useStoryblokApi();

const state = reactive({ story: null });
const path = route.path === "/" ? "/home" : route.path;

try {
  // const { data } = await storyblokApi.get(`cdn/stories${route.path}`, {
  const { data } = await storyblokApi.get(`cdn/stories${path}`, {
    version: "draft",
  });
  state.story = data.story;
} catch (error) {
  console.error(error);
}

onMounted(() => {
  if (!state.story) return;
  useStoryblokBridge(state.story.id, (story) => (state.story = story));
});
</script>

<style lang="scss" scoped></style>
