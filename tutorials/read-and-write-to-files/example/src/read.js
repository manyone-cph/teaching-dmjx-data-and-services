const fs = require("fs");

// read the file
fs.readFile("content/global.json", "utf8", (err, data) => {
  // handle error if any
  if (err) throw err;

  // parse the JSON data
  let config = JSON.parse(data);

  // print the data
  console.log(config);
});
