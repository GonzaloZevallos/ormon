# Ormon
Artisan ORM for JSON databases

### Use
To use ORMON you need to create the models you need within the path `models/` and then require the `index` file that found in the models folder where you want to use it.

It is important to have installed the ormon client and have generated the necessary folder structure to be able to use ormon. 

More info: https://github.com/GonzaloZevallos/ormon-cli

### Template model

```js script
const Ormon = require('ormon');

module.exports = class ModelName extends Ormon {
    constructor() {
        super('tablename', __dirname);
    }
}
```

### Require example
```js script
 const { ModelName } = require('./database/models');
```
