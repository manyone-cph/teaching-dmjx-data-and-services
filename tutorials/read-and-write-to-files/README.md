# Guide: Read and write to files

This tutorial demonstrates how to read and write to files in Node.js. We'll be focusing on JSON files in the examples, but the same principles can be applied to other file types.

## Introduction to JSON

JSON is a widely-used data format for storing and exchange structured data. It is human-readable and supported by a multitude of programming languages, making it ideal for data interchange. JSON is often used in configuration files, data storage for static content, and as a format for sending and receiving data between clients and servers.

JSON's format is simple: it represents data as name/value pairs, much like a JavaScript object. It can represent numbers, strings, ordered sequences of values, and collections of name/value pairs.

Example of a JSON Object:

```json
{
  "name": "Example",
  "version": 1.0,
  "dependencies": {
    "threejs": "^0.125.2",
    "astro": "^0.23.0"
  },
  "keywords": ["example", "json", "tutorial"]
}
```

### When to use JSON

- Configuration files and application settings (e.g. package.json)
- Static data storage (e.g. content for a website)
- Data interchange between clients and servers (e.g. REST APIs)

At Manyone, we often use JSON to store data in files in the project, for example configuration files or static data such as content for the main navigation, tags, etc. that we want to fetch in the build process to optimise page load speed.

### Writing to a JSON File

This can be essential in a build process where pre-configured settings are needed. Below is a Node.js script example that writes a JSON object to a file.

```javascript
const fs = require('fs');

let settingsJson = JSON.stringify({
  "debugMode": true,
  "logLevel": "verbose",
  "port": 8080
}, null, 4);

fs.writeFile('config.json', settingsJson, (err) => {
  if (err) throw err;
  console.log('Config saved!');
});
```

### Reading from a JSON File

Reading from a JSON file is similarly straightforward. Here’s how you can read a JSON file and log its contents.

```javascript
Copy code
const fs = require('fs');

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) throw err;
  let config = JSON.parse(data);
  console.log(config);
});
```

## Assignments

In the [/examples](./examples) folder, you'll find an example project with reading and writing to JSON. You can use that as a starting point for the assignments below.

### 1. Convert JSON to CSV and vice versa

Create a Node.js script that reads a JSON file and converts it to a CSV file. Then, create another script that reads the CSV file and converts it back to a JSON file.

- Use the `fs` module to read and write files.
- Use packages like [`json-2-csv`](https://www.npmjs.com/package/json-2-csv) to help with the conversion.

### 2. Fetch data from an API and write it to a JSON file

Create a Node.js script that fetches data from an API of your choice and writes it to a JSON file.

- Read the [API Guide](/tutorials/api/) to understand how to fetch data from an API.
- Use the `fetch` module to make HTTP requests.
- Use the `fs` module to read and write files.
- Try to filter the data before saving to ensure only relevant information is stored, optimizing file size and clarity.

## Further reading

- [MDN Web Docs on JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [W3Schools JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
- [Node.js File System Module Guide](https://areknawo.com/node-js-file-system-api-beginner-friendly-guide/)