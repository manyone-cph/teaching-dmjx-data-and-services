# Dynamic Page Rendering

Dynamic page rendering is a technique used to generate layouts dynamically on the server or client, using data to craft personalized, interactive web experiences without hardcoding content.

## Data structure

Guidelines for how to structure components and data in a dynamic page rendering project.

Atomic design principles can be applied to the structure of the project:

- **Pages**: Create a page for each view in the application.
- **Components**: Break down the page into reusable components that can be used to render different parts of the page.
- **Data**: Store data in JSON files that can be imported and looped through to render content on the page.

### How to structure my JSON

When creating a JSON file for dynamic page rendering, consider the following:

- **Data structure**: How should the data be structured to make it easy to loop through and render on the page?
- **Content types**: What types of content will be displayed on the page? (e.g. text, images, links, etc.)
- **Nested data**: How should nested data be structured to maintain relationships between different pieces of content?
- **Metadata**: What additional information should be included in the JSON file to help with rendering or styling the content?
- **Data consistency**: How can we ensure that the data is consistent across different pages or components?
- 


## Assignments

### 1. Create a dynamic page rendering

1. Clone the [dynamic-page-rendering example](./example) project.
2. Run the project with `nvm use`, `npm install` and `npm run dev`
3. Open the project in your browser and inspect the code. You'll see that the home page is rendering json content in a code block that is imported from a local file. [SCREENSHOT]
4. Loop through the JSON data and render it on the page. When you're done it should look something like this. [SCREENSHOT]


### 2. Create your own dynamic page rendering

1. In the vite project from assignment 1, go to the `src/data` folder and create a new JSON file with your own structured page data. [SOME GUIDELINES]
  - Try to structure your data so you can reuse components. For instance a button should always have the same data field, so you can reuse the button component. Card components should have the same data fields, so you can reuse the card component.
  - Think about how you can structure your data so you can loop through it and render it on the page.
  - Think about how you can structure your data so you can create a cohesive user experience.
  - Think about how you can structure your data so you can ensure data consistency across different pages or components.
2. Create a new page in the `src/pages` folder and import the JSON data.
3. Loop through the JSON data and render it on the page.



TODO: Add example project where we use dynamic page rendering to create a blog with a list of posts and a detail page for each post.

To begin with it should just be rendering the JSON data

And we should add a screenshot of the expected output after all data is looped through and rendered on the page.