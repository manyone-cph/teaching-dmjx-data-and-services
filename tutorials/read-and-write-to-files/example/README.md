# example-read-and-write

This example demonstrates how to read and write files in Node.js.

## Project structure

```plaintext
example-json-read-and-write/
├── content/* (files to read)
├── src/
│   ├── read.js (Node.js script to read files)
│   └── write.js (Node.js script to write files)
└── package.json
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v21 or higher)
- npm

### Getting Started

To run these examples locally follow these steps:

1. `nvm use` to use the correct Node.js version from the `.nvmrc` file
2. `npm install` to install the project dependencies
3. Run the scripts
  a. `npm run json:read` to read JSON file
  b. `npm run json:write` to write JSON file

Try to modify the read and write files to change what's being printed in the console and written to the file.
