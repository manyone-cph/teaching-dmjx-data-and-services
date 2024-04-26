# Steps to set up DMJX website project

## 1. Create a new project

https://vitejs.dev/guide/ - build tool for modern web development

`npm create vite@latest` > vue, javascript
`cd <project-name>`
`npm install`
`npm run dev`

Open in VS code:

Update `vite.config.js` with alias:
`import path from "path";`
```js
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
```

## 1b Make HTTPS work

We'll need this later for the visual preview in Storyblok...

`npm install vite-plugin-mkcert`
Update `vite.config.js` with mkcert plugin.

## 2. Create basic components

`@/components/base/Header.vue` with `<header></header>`
`@/components/base/Footer.vue` with `<footer></footer>`

`@/components/modules/*`

Plugin: `sdras.vue-vscode-snippets`

## 3. Clean App.vue

`App.vue`: Remove everything and add <footer>, <main> and <header> components.
`main.js`: Remove style.css import
`index.html`: Update page title.


## 4. Reset CSS

https://www.npmjs.com/package/@unocss/reset?activeTab=code

`npm install @unocss/reset`

## 5. Add fonts

Add font files in: `@/assets/fonts/*`

Add font css definition in `@/assets/styles/fonts.css`:
```css
@font-face {
  font-family: 'studio-6';
  font-weight: normal;
  font-style: normal;
  src: url('@/assets/fonts/Studio6-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'berlingske-serif';
  font-weight: normal;
  font-style: normal;
  src: url('@/assets/fonts/BerlingskeSerifText-Light.woff2') format('woff2');
}
```

Add `main.css`:

```css
@import 'fonts.css';

:root {
  --font-sans: 'studio-6', sans-serif;
  --font-serif: 'berlingske-serif', serif;
  --fz-headline-lg: 3rem;
  --fz-headline-md: 2rem;
  --fz-headline-sm: 1.5rem;
}


html {
  font-family: var(--font-sans);
  line-height: 1.5;
}

h1, h2, h3 {
  display: inline-block;
  line-height: 1.2;
  margin-bottom: 1rem;
}

p {
  font-family: var(--font-serif);
}

```

Import `main.css` in `main.js`: `import "@/assets/styles/main.css";`



## 6. Style header

Make it look like the DMJX header...

## 7. Add Storyblok

Make `Home.vue` and `About.vue` views

https://www.storyblok.com/tp/add-a-headless-CMS-to-vuejs-in-5-minutes
https://github.com/storyblok/storyblok-vue

https://vitejs.dev/guide/env-and-mode

Make a new Storyblok space
- Plan: Community

a. Install Storyblok plugin: `npm install @storyblok/vue`
b. Add Storyblok plugin in `main.js` - `import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN`
c. Add `.env` file with `VITE_STORYBLOK_ACCESS_TOKEN` and put it in gitignore

## 8. Fetch content from Storyblok

https://github.com/storyblok/storyblok-vue?tab=readme-ov-file#long-form

`@/views/Home.vue` - fetch content and show json
App.vue: Add <Home/> view with <Suspense> around it


## 9. Add Vue Router

Go to /about to show that the same content is loaded...

https://router.vuejs.org/installation.html

`npm install vue-router@4`

Add about route: `@/views/About.vue` - empty page
Add `router.js` with routes and router setup (using Home.vue and About.vue) - `createWebHistory`

Update `main.js` with router setup:
```js
import router from "./router";
app.use(router);
```

```js
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:slug",
    name: "Page",
    component: () => import("@/views/Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

`App.vue`: Replace <Home> with <router-view> inside suspense:

```html
<RouterView v-slot="{ Component, route }">
  <Suspense>
    <div>
      <component :is="Component" :key="route.path" />
    </div>
    <template #fallback>Loading...</template>
  </Suspense>
</RouterView>
```

## 10. One route for all pages

https://router.vuejs.org/guide/advanced/composition-api.html

What if we make all pages render the same view?

`@/views/Page.vue` with `<pre>{{ route }}</pre>`
```js
import { useRoute } from "vue-router";
const route = useRoute();
```

Update `router.js`: `{ path: "/:pathMatch(.*)*", component: Page }`

## 11. Dynamic fetch content

`@/views/Page.vue`: Fetch content from Storyblok based on route path: `cdn/stories${route.path}`

In the CMS create an `about` page.

## 12. Default page for home page

If `route.path` === `/`, then fetch from `/home` instead.

## 13. Render page templates and modules

Add `@/components/templates/*` components with html and css
Add `@/components/modules/*` components with html and css

Render templates in `Page.vue` based on template type

## 14. Visual editor experience

https://github.com/storyblok/storyblok-vue?tab=readme-ov-file#2-listen-to-storyblok-visual-editor-events

Add preview url in Storyblok settings: `https://localhost:5173/`

Add bridge in `Page.vue`:
```js
  import { useStoryblokBridge, useStoryblokApi } from "@storyblok/vue";
  const state = reactive({ story: data.story });

  onMounted(() => {
    useStoryblokBridge(state.story.id, story => (state.story = story));
  });
```

## 15. Add global data

Copy-paste <Header/> from example project.

Storyblok: `/config`
- Header (blok)
  - Nav Primary (blok)
    - Nav Link (blok)
    - Nav Link (blok)
  - Nav Secondary (blok)
    - Nav Link (blok)
    - Nav Link (blok)

`@/components/base/Header.vue`: Fetch global data and render navs

## 16. Handle 404

`Page.vue` > try catch
If no data, then show 'Page not found message'

```html
<div v-if="!state?.story">Page not found</div>
```

```js
const state = reactive({ story: null });

try {
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
```

## 17. Further enhancements

- Image service: https://www.storyblok.com/docs/image-service/
- Link resolver: https://www.storyblok.com/docs/guide/in-depth/rendering-the-link-field
- Rich text resolver: https://www.storyblok.com/docs/richtext-field
- JSON prebuild fetch for config with global data.



## Ordbog

Ordbog
- SASS/SCSS - CSS extension language
- SDK - Software Development Kit


## 18. Optional: Install UnoCSS

https://unocss.dev/integrations/vite
`npm install -D unocss`
`npm install @unocss/reset`

Update `vite.config.js` with UnoCSS plugin.
Add `uno.config.js` with `presetUno` in presets array.
Add `import '@unocss/reset/tailwind-compat.css'` in `main.js`


Add fonts in `uno.config.js`:
```js
theme: {
  fontFamily: {
    "studio-6": ["studio-6", "sans-serif"],
    "berlingske-serif": ["berlingske-serif", "serif"],
  },
},
```


Global font in `index.html`:
<div id="app" class="font-studio-6"></div>
