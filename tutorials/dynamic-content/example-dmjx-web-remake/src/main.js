import { createApp } from "vue";
import { StoryblokVue, apiPlugin } from "@storyblok/vue";

// import "./style.css";
import "@unocss/reset/tailwind-compat.css";
import "@/assets/styles/main.css";

import router from "./router.js";
import App from "./App.vue";

const app = createApp(App);
app.use(router);

app.use(StoryblokVue, {
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

app.mount("#app");
