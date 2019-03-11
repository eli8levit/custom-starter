const Configstore = require('configstore');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { QUESTIONS } = require('../utils');

const configstore = new Configstore('copier');

const validate = value => {
  const pass = value.match(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
  );
  return pass ? true : 'Please enter a valid URL';
};

const questions = [QUESTIONS.StarterName, { ...QUESTIONS.StarterUrl, validate }];

function add() {
  return new Promise((resolve, reject) => {
    try {
      const starters = configstore.get('starters') || {};
      inquirer.prompt(questions).then(starterData => {
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
