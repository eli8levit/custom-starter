const { spawn, exec } = require('child_process');
const fs = require('fs-extra');
const Configstore = require('configstore');
const inquirer = require('inquirer');
const chalk = require('chalk');
const add = require('./add');
const { QUESTIONS, spinner } = require('../utils');

const configstore = new Configstore('copier');
const currentPath = process.cwd();
const CLONED_FOLDER_NAME = '.copier';
const pathToFolder = `${currentPath}/${CLONED_FOLDER_NAME}`;

async function clone() {
  try {
    const starterUrl = await selectStarter();
    const args = ['clone', '--depth', '1', starterUrl];
    spinner.start('Cloning a starter...');
    spawn('git', [...args, pathToFolder]).on('close', async code => {
      if (code === 0) {
        const ifInstallPackages = fs.existsSync(`${pathToFolder}/package.json`);
        fs.removeSync(pathToFolder + '/.git');
        fs.moveSync(`${pathToFolder}/.`, currentPath);
        spinner.succeed('Starter cloned');
        fs.removeSync(pathToFolder);
        if (ifInstallPackages) {
          spinner.start('Installing packages...');
          exec('npm install', err => {
            if (err) {
              throw err;
            }
            spinner.succeed('Packages installed');
            console.log(chalk.green('starter complete'));
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    spinner.fail('Failed to clone');
  }
}

function install() {
  return new Promise((res, rej) => {
    spawn('npm', ['install']).on('close', code => {
      if (code === 0) {
        res();
      }
      rej();
    });
  });
}

async function selectStarter() {
  const starters = configstore.get('starters');
  if (!starters) {
    return await inquirer.prompt([QUESTIONS.AddFirstStarter]).then(async ({ addFirstStarter }) => {
      if (addFirstStarter) {
        await add();
        return selectStarter();
      }
      process.exit();
    });
  }
  const choices = Object.keys(starters);
  if (choices.length === 1) {
    return starters[choices[0]].url;
  }
  return await inquirer
    .prompt([{ ...QUESTIONS.SelectStarter, choices }])
    .then(({ selectedStarter }) => {
      return starters[selectedStarter].url;
    });
}

module.exports = clone;
