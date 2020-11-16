const Ormson = require('../../../lib/Model');

class Product extends Ormson {
    constructor() {
        super('products', __dirname);
        
        this.define({
            name: {
                type: String,
                required: true,
                validator: name => name.length > 10
            },
            price: {
                type: Number,
                required: true,
                validator: price => price > 0
            }
        });
    }
}

module.exports = Product;