#!/usr/bin/env node
'use strict';

const program = require('commander');
const start = require('./commands/clone');
const add = require('./commands/add');

program
  .version('0.0.1')
  .command('start')
  .description('Clones a starter')
  .action(start);

program
  .version('0.0.1')
  .command('add')
  .description('Adds a starter')
  .action(add);

program.parse(process.argv);
