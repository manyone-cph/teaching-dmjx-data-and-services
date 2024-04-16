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

At Manyeone, we often use JSON to store data in files in the project, for example configuration files or static data such as content for the main navigation, tags, etc. that we want to fetch in the build process to optimise page load speed.

## Practical guide

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

## Further reading

- [MDN Web Docs on JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [W3Schools JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
- [Node.js File System Module Guide](https://areknawo.com/node-js-file-system-api-beginner-friendly-guide/)

## Assignments

1. Create a node.js script that converts JSON to CSV and vice versa.
    - Use the `fs` module to read and write files.
    - You can use packages like [`json-2-csv`](https://www.npmjs.com/package/json-2-csv) to help with the conversion.
2. Create a node.js script to fetch data from an API and save it to a JSON file.
    - Use the `fetch` module to make HTTP requests.
    - Save the data to a JSON file using the `fs` module.
