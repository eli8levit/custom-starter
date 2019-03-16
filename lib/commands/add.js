'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const execa = require('execa');
const { QUESTIONS, configstore } = require('../utils');

const validate = async value => {
  const pass = value.match(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );
  if (pass) {
    try {
      await execa('git', ['ls-remote', '-h', value]);
      return true;
    } catch (err) {
      return 'Repo not found, please insert existing git repo url';
    }
  }
  return 'Please enter a valid URL';
};

const questions = [QUESTIONS.StarterName, { ...QUESTIONS.StarterUrl, validate }];

function add() {
  return new Promise((resolve, reject) => {
    try {
      const { ...starters } = configstore.get('starters') || {};
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
