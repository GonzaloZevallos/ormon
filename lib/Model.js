const fs = require("fs");
const path = require("path");

module.exports = class Model {
  constructor(tablename) {
    this.tablename = tablename;
    this.path = path.resolve(`${__dirname}/../data/${this.tablename}.json`);
  }

  save(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    return true;
  }

  exist() {
    return fs.existsSync(this.path);
  }

  readParsed() {
    if (!this.exist(this.path)) {
      this.save([]);
    }
    return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
  }

  generateId() {
    const allData = this.readParsed();
    const lastElement = allData.pop();
    return lastElement ? ++lastElement.id : 1;
  }

  findAll(callback = false) {
    if (!callback) {
      return this.readParsed();
    }

    return this.readParsed().filter(callback);
  }

  findOne(callback) {
    const allData = this.readParsed();
    return allData.find(callback);
  }

  findByPk(id) {
    return this.readParsed().find((element) => element.id == id);
  }

  create(data) {
    const allData = this.readParsed();
    let id = this.generateId();

    const allDataModified = [
      ...allData,
      {
        id: id,
        ...data,
      },
    ];
    this.save(allDataModified);
    return this.findByPk(id);
  }

  destroy(id) {
    const allData = this.readParsed();
    const allDataModified = allData.filter((e) => e.id != id);
    return this.save(allDataModified);
  }

  edit(id, data) {
    const allData = this.readParsed();

    let elementModified;

    const allDataModified = allData.map((product) => {
      if (product.id != id) {
        return product;
      }

      elementModified = {
        id: product.id,
        ...data,
      };

      return elementModified;
    });

    this.save(allDataModified);

    return elementModified;
  }
};