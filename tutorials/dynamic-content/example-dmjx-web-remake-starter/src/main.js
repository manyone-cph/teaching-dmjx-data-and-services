import { createApp } from "vue";

// reset browser styles and import global styles
import "@unocss/reset/tailwind-compat.css";
import "@/assets/styles/main.css";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);

app.use(router);

app.mount("#app");
