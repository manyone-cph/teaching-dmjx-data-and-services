# Dynamic Page Rendering

Dynamic page rendering is a technique used to generate layouts dynamically based on data from content management systems (CMS) databases. This approach enables us to craft personalized, interactive web experiences without hardcoding content.

## Structuring your content

To effectively use dynamic page rendering, you must organize your project with clear component and data structures:

- **Pages**: Design each view in your application as a separate page.
- **Components**: Break down pages into reusable components. Familiarize yourself with [Atomic Design principles](https://atomicdesign.bradfrost.com/chapter-2/) to optimize component architecture.
- **Data model**: Define content templates and component types and make a data model for each type to ensure consistency across your project.
- **Data storage**: Store your data in JSON format to be imported and looped through to render dynamic content on the page.

## Efficient JSON structure

When crafting a JSON file for dynamic page rendering, consider the following to ensure efficient processing and rendering:

- **Data Structure**: How can you structure your data to facilitate easy looping and conditional rendering?
- **Content Types**: What types of content (e.g., text, images, links) will your pages display? And what is the data schema for each content type?
- **Nested Data**: How can you nest data to maintain the relationships and hierarchy among your content?
- **Metadata**: What metadata should you include to assist in the rendering and styling of content?
- **Data Consistency**: How will you ensure data consistency across different components and pages, such as maintaining uniform data fields for buttons?

## Assignments

In this guide the content live in JSON files within the project, but in a real world scenario you would fetch the data via APIs from a [headless CMS](https://www.sanity.io/headless-cms) or database.

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


## Further reading

- [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/): Principles for designing scalable and maintainable web interfaces.
- [Headless CMS](https://www.sanity.io/headless-cms): A content management system that provides a clean separation between content and presentation, enabling dynamic page rendering.
- [Data modelling](https://www.thedataschool.com.au/john-lyu/data-modeling-101-a-beginners-guide-to-success/): A beginner's guide to data modelling for effective data structuring. This is very backend focused, but it's good to understand how data is structured in databases.

