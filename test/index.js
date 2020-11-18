const { Product } = require('./database/models');

const testObj = {
    name: 'calculadora',
    price: 100
}

Product.create(testObj);