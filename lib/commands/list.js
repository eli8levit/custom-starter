'use strict';

const chalk = require('chalk');
const { configstore } = require('../utils');

function list() {
  const starters = configstore.get('starters');
  if (starters) {
    console.log(chalk.magenta('<----'));
    Object.keys(starters).forEach(starterName => {
      console.log(`${chalk.bold.blue(starterName) + ':'}`, chalk.bold(starters[starterName].url));
    });
    console.log(chalk.magenta('---->'));
  } else {
    console.log(chalk.italic('No saved starters'));
  }
}

module.exports = list;
