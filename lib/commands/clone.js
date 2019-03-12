'use strict';

const fs = require('fs-extra');
const Configstore = require('configstore');
const inquirer = require('inquirer');
const execa = require('execa');
const add = require('./add');
const { QUESTIONS, spinner } = require('../utils');

const configstore = new Configstore('copier');
const currentPath = process.cwd();
const CLONED_FOLDER_NAME = '.custom-starter';
const pathToFolder = `${currentPath}/${CLONED_FOLDER_NAME}`;

async function clone() {
  try {
    const starterUrl = await selectStarter();
    const args = ['clone', '--depth', '1', starterUrl];
    spinner.start('Cloning a starter...');
    await execa('git', [...args, pathToFolder]);
    const installPackages = await fs.existsSync(`${pathToFolder}/package.json`);
    await fs.removeSync(pathToFolder + '/.git');
    spinner.succeed('Starter cloned');
    if (installPackages) {
      await fs.removeSync(currentPath + '/package.json');
    }
    await fs.moveSync(`${pathToFolder}/.`, currentPath);
    const promises = [fs.remove(pathToFolder)];
    await fs.removeSync(pathToFolder);
    if (installPackages) {
      const intallPackages = new Promise(async (resolve, reject) => {
        try {
          spinner.start('Installing packages...');
          await execa('npm', ['install']);
          spinner.succeed('Packages installed');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      promises.push(intallPackages);
    }
    await Promise.all(promises).then(() => {
      console.log();
      console.log('👌', ' Starter cloned');
    });
  } catch (err) {
    spinner.fail('Failed to clone');
    process.exit(1);
  }
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
