# amv-trafficsoft-rest-js
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> AMV Trafficsoft API Javascript Client
Access the AMV Trafficsoft API with javascript for client and server apps.

Uses (axios)[https://github.com/mzabriskie/axios] as underlying http client.

## Installation

```
$ npm install --save amv-trafficsoft-rest-js
```

## Usage
```js
var amvTrafficsoftRestJs = require('amv-trafficsoft-rest-js');
```

## API

### `amvTrafficsoftRestJs([options])`
Description

#### Parameters
- **Object** `options`: An configuration object containing the following options:
-- baseURL: the http endpoint e.g. http://example.com
-- username: your username
-- password: your password
-- contractId: your contract id

#### Return
- **Object** - A AMV Trafficsoft client factory

```javascript
import amvApiClientsFactory from 'amv-trafficsoft-rest-js';
var amvApiClients = amvApiClientsFactory({
   username: '',
   password: '',
   contractId: '',
   baseURL: 'http://www.example.com'
});

var xfcdClient = amvApiClients.xfcd();

var vehicleIds = [1, 2, 3];
xfcdClient.getLastData(vehicleIds)
  .then(response => {
  })
  .catch(error => {
  });
```

## Development
- `npm run build` - Build task that generates both minified and non-minified scripts;
- `npm run test-server` - Run Mocha tests once;
- `npm run test-browser` - Run Mocha tests in the browser using Karma once;
- `npm run test` - Shortcut for `npm run test-server && npm run test-browser`;
- `npm run tdd` - Run Mocha tests & watch files for changes;
- `npm run tdd-browser` - Run Karma (w/ Mocha) tests & watch files for changes;
- `npm run coverage` - Run Isparta, a code coverage tool;

## License
MIT © [AMV Networks GmbH](http://github.com/amvnetworks)

[travis-url]: https://travis-ci.org/amvnetworks/amv-trafficsoft-rest-js
[travis-image]: https://img.shields.io/travis/amvnetworks/amv-trafficsoft-rest-js.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/amvnetworks/amv-trafficsoft-rest-js
[coveralls-image]: https://img.shields.io/coveralls/amvnetworks/amv-trafficsoft-rest-js.svg?style=flat-square

[depstat-url]: https://david-dm.org/amvnetworks/amv-trafficsoft-rest-js
[depstat-image]: https://david-dm.org/amvnetworks/amv-trafficsoft-rest-js.svg?style=flat-square
