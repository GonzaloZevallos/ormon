const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const directories = fs.readdirSync(__dirname);

const indexOfIndex = directories.indexOf('index.js');

if (indexOfIndex !== -1) {
  directories.splice(indexOfIndex, 1);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[file.slice(0, -3)] = new model;
  });

module.exports = db;