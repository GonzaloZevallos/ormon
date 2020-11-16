># Ormson
>Artisan ORM for JSON databases

### Installation
1. `npm install ormson`

### Use
To use ORMSON you need to create the models you need within the path `models/` and then require the `index` file that found in the models folder where you want to use it.

It is important to have installed the ormon client and have generated the necessary folder structure to be able to use ormon.

More info: https://github.com/GonzaloZevallos/ormson-cli

### Template model

```js script
const Ormson = require('ormson');

module.exports = class ModelName extends Ormson {
    constructor() {
        super('tablename', __dirname);
    }
}
```

### Require example
```js script
 const { ModelName } = require('./database/models');
```
