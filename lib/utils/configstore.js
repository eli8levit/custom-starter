const Configstore = require('configstore');

let configstore;

if (process.env.NODE_ENV === 'test') {
  configstore = new Configstore('custom-starter_test');
} else {
  configstore = new Configstore('custom-starter');
}

module.exports = configstore;
