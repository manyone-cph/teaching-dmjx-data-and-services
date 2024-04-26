<script setup>
import Header from "@/components/base/Header.vue";
import Footer from "@/components/base/Footer.vue";
</script>

<template>
  <Suspense>
    <Header />
  </Suspense>
  <main>
    <RouterView v-slot="{ Component, route }">
      <Suspense>
        <div :key="route.path">
          <component :is="Component" />
        </div>
        <template #fallback>Loading...</template>
      </Suspense>
    </RouterView>
  </main>
  <Footer />
</template>

<style scoped></style>
