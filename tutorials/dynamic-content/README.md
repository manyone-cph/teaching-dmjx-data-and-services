# Dynamic Content

Dynamic content is a technique used to generate layouts dynamically based on data from content management systems (CMS) and/or databases. This approach enables us to craft personalized, interactive web experiences without hardcoding content.

## Structuring your content

To effectively use dynamic content, you must organize your project with clear component and data structures:

- **Pages**: Design each view in your application as a separate page.
- **Components**: Break down pages into reusable components. Familiarize yourself with [Atomic Design principles](https://atomicdesign.bradfrost.com/chapter-2/) to optimize component architecture.
- **Data model**: Define content templates and component types and make a data model for each type to ensure consistency across your project.
- **Data storage**: Store your data in JSON format to be imported and looped through to render dynamic content on the page.

## Efficient JSON structure

When crafting a JSON file for dynamic content, consider the following to ensure efficient processing and rendering:

- **Data Structure**: How can you structure your data to facilitate easy looping and conditional rendering?
- **Content Types**: What types of content (e.g., text, images, links) will your pages display? And what is the data schema for each content type?
- **Nested Data**: How can you nest data to maintain the relationships and hierarchy among your content?
- **Metadata**: What metadata should you include to assist in the rendering and styling of content?
- **Data Consistency**: How will you ensure data consistency across different components and pages, such as maintaining uniform data fields for buttons?

## Assignments

In this guide the content live in JSON files within the project, but in a real world scenario you would fetch the data via APIs from a [headless CMS](https://www.sanity.io/headless-cms) or database.

### 1. Create dynamic content in JSON

1. Set up a Vite + Vue app with `npm create vite@latest` (or use an existing project).
2. Create a `src/data` folder.
3. Make a new JSON file for each page with the content you want to display.
    - Think about how you can structure your data so you can reuse components, loop through it, and create a cohesive user experience.
    - Make reuseable components with consistent data fields. For instance a button should always have the same data field, so you can reuse the button component. Card components should have the same data fields, so you can reuse the card component.
4. Loop through the JSON data in the frontend to render it on the page.

### 2. Create dynamic content with a headless CMS

1. Create a new space in a headless CMS like Storyblok.
2. Create your data model with content types and fields.
3. Populate your content with real data.
4. Fetch the data from the headless CMS using their API.
5. Render the content on your site.

## Further reading

- [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/): Principles for designing scalable and maintainable web interfaces.
- [Headless CMS](https://www.sanity.io/headless-cms): A content management system that provides a clean separation between content and presentation, enabling dynamic content.
- [Data modelling](https://www.thedataschool.com.au/john-lyu/data-modeling-101-a-beginners-guide-to-success/): A beginner's guide to data modelling for effective data structuring. This is very backend focused, but it's good to understand how data is structured in databases.
