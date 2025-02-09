const fs = require('fs');

async function loadJSON(path) {
  const data = await fs.promises.readFile(path, 'utf8');
  return JSON.parse(data);
}

module.exports = loadJSON;
