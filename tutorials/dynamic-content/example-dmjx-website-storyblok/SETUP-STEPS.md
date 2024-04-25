# Steps to set up DMJX website project

## 1. Create a new project
`npm create vite@latest` > vue, javascript
`cd <project-name>`
`npm install`
`npm run dev`

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
}

.app {
  font-family: var(--font-sans);
}
```

Import `main.css` in `main.js`: `import "@/assets/styles/main.css";`



## 6. Style header

Make it look like the DMJX header...

## 7. Add Storyblok

https://www.storyblok.com/tp/add-a-headless-CMS-to-vuejs-in-5-minutes
https://github.com/storyblok/storyblok-vue

Make a new Storyblok space
- Plan: Community

a. Install Storyblok plugin: `npm install @storyblok/vue`
b. Add Storyblok plugin in `main.js` - `import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN`
c. Add `.env` file with `VITE_STORYBLOK_ACCESS_TOKEN` and put it in gitignore

## 8. Fetch content from Storyblok

https://github.com/storyblok/storyblok-vue?tab=readme-ov-file#long-form

`@/views/Home.vue` - fetch content and show json
App.vue: Add <Home/> view with suspense around it


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

`App.vue`: Replace <Home> with <router-view> inside suspense

## 10. One route for all pages

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

## 12. Visual editor experience

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

## 13. Default page for home page

If `route.path` === `/`, then fetch from `/home`

## 14. Handle 404

`Page.vue` > try catch
If no data, then show 'Page not found message'

## 15. Add global data

Storyblok: `/config`
- Header (blok)
  - Nav Primary (blok)
    - Nav Link (blok)
    - Nav Link (blok)
  - Nav Secondary (blok)
    - Nav Link (blok)
    - Nav Link (blok)

`@/components/base/Header.vue`: Fetch global data and render navs


## 16. Render Page modules







## 4. Install UnoCSS

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