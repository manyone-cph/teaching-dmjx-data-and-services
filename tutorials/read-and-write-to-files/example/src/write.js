const fs = require("fs");

const outDir = "dist";

// create a folder if it doesn't exist
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// create a JSON object - this data could be from a database or API
const settings = {
  debugMode: true,
  logLevel: "verbose",
  port: 8080,
};
const settingsJson = JSON.stringify(settings, null, 2);

// write to file
fs.writeFile(`${outDir}/config.json`, settingsJson, (err) => {
  // handle error if any
  if (err) throw err;

  // success
  console.log("Config saved!");
});
