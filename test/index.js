const { Product } = require('./database/models');

console.log(Product.create({name: 'Cafetera', price: '1231'}));