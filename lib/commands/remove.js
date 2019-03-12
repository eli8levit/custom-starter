'use strict';

const Configstore = require('configstore');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { QUESTIONS } = require('../utils');

const configstore = new Configstore('copier');

function remove() {
  const starters = configstore.get('starters');
  const choices = Object.keys(starters);
  let startersStr = '';
  const questions = [{ ...QUESTIONS.RemoveStarter, choices }];
  inquirer.prompt(questions).then(({ listToRemove }) => {
    listToRemove.forEach(name => {
      delete starters[name];
      startersStr += name + ' ';
    });
    configstore.set('starters', starters);
    console.log(chalk.green('✔'), `Deleted: ${startersStr}`);
  });
}

module.exports = remove;
