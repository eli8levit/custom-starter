'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const { QUESTIONS, configstore, validate } = require('../utils');

const questions = [QUESTIONS.StarterName, { ...QUESTIONS.StarterUrl, validate }];

function add() {
  return new Promise((resolve, reject) => {
    try {
      const starters = configstore.get('starters') || {};
      inquirer.prompt(questions).then(starterData => {
        starters[starterData.name] = starterData;
        configstore.set('starters', { ...starters, [starterData.name]: starterData });
        console.log(chalk.green('✔'), 'Saved');
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = add;
