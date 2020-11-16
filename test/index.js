const { Product } = require('./database/models');

Product.update(1, {price: '100'});