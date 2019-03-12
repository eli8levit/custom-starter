'use strict';

const Configstore = require('configstore');
const chalk = require('chalk');

const configstore = new Configstore('copier');

function list() {
  const starters = configstore.get('starters');
  console.log(chalk.magenta('<----'));
  Object.keys(starters).forEach(starterName => {
    console.log(`${chalk.bold.blue(starterName)}:`, chalk.bold(starters[starterName].url));
  });
  console.log(chalk.magenta('---->'));
}

module.exports = list;
