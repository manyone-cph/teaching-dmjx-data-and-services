import { createWebHistory, createRouter } from "vue-router";

// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
import Page from "@/views/Page.vue";

const routes = [
  // { path: "/", component: Home },
  // { path: "/about", component: About },
  { path: "/:pathMatch(.*)*", component: Page },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
