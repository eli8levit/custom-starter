'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const { QUESTIONS, configstore } = require('../utils');

function remove() {
  const starters = configstore.get('starters');
  if (starters) {
    const choices = Object.keys(starters).map(name => ({
      name: `${chalk.bold.blue(name)} ${chalk.bold.grey(starters[name].url)}`,
      value: name,
    }));
    const questions = [{ ...QUESTIONS.RemoveStarter, choices }];
    inquirer.prompt(questions).then(({ listToRemove }) => {
      listToRemove.forEach(name => delete starters[name]);
      configstore.set('starters', starters);
      console.log(chalk.green('✔'), 'Deleted');
    });
  } else {
    console.log(chalk.italic('No starters to remove'));
  }
}

module.exports = remove;
