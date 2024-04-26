<template>
  <div>
    <!-- Page template
    <pre>{{ blok }}</pre> -->

    <template v-for="_module in blok?.body">
      <ModuleTeaser v-if="_module.component === 'ModuleTeaser'" :blok="_module" />
      <ModuleTeaserText v-else-if="_module.component === 'ModuleTeaserText'" :blok="_module" />
      <ModuleTeaserCourses v-else-if="_module.component === 'ModuleTeaserCourses'" :blok="_module" />
      <p v-else>{{ _module.component }}</p>
    </template>
  </div>
</template>

<script setup>
import ModuleTeaser from "@/components/modules/ModuleTeaser.vue";
import ModuleTeaserText from "@/components/modules/ModuleTeaserText.vue";
import ModuleTeaserCourses from "@/components/modules/ModuleTeaserCourses.vue";

defineProps({
  blok: Object,
});
</script>

<style scoped></style>
