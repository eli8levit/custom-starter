const Configstore = require('configstore');

const configstore = new Configstore('copier');

function list() {
  const starters = configstore.get('starters');
  Object.keys(starters).forEach(starterName => {
    console.log(`${starterName}:${starters[starterName].url}`);
  });
}

module.exports = list;
