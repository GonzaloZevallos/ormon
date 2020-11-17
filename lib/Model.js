const fs = require("fs");
const path = require("path");
const validateTypes = require('validate-types');

module.exports = class Model {

  define (structure, config) {
    this.structure = {
      id: Number,
      ...structure
    }
    this.tablename = config.tablename;
    this.modelname = path.basename(config.location).slice(0, -3);
    this.basename = path.basename(config.location).slice(-3);
    this.__dirname = path.dirname(config.location);
    this.path = path.resolve(`${this.__dirname}/../tables/${this.tablename}.json`);
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

  validateInput (data) {
    if(!this.structure){
      throw 'You need to define the model structure';
    }
    return validateTypes(this.structure, data);
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
    const validationResult = this.validateInput(data);
    
    if(validationResult.hasErrors){
      validationResult.errors.forEach(err => {
        console.log(`${err.test} error: ${err.message}`)
      });
      throw 'Validate type errors';
    }
    
    const allData = this.readParsed();
    const id = this.generateId();

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

  update(id, data) {
    const allData = this.readParsed();
    let elementModified;

    const allDataModified = allData.map((product) => {
      if (product.id != id) {
        return product;
      }

      elementModified = {
        ...product,
        ...data
      };

      const validationResult = this.validateInput(elementModified);

      if (validationResult.hasErrors) {
        validationResult.errors.forEach(err => {
          console.log(`${err.test} error: ${err.message}`)
        });
        throw 'Validate type errors';
      }
      
      return elementModified;
    });

    this.save(allDataModified);

    return elementModified;
  }
};