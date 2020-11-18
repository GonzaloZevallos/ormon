const Ormson = require('../../../lib/Model');

class Product extends Ormson {
    constructor() {
        super();
        this.define({
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                validator: price => price > 0
            }
        }, {
            tablename: 'products',
            location: __filename
        });
    }
}

module.exports = Product;