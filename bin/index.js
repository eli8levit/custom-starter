#!/usr/bin/env node
'use strict';

const program = require('commander');
const { start, add, list, remove } = require('../lib/commands');

program.version('0.0.1');

program
  .command('start')
  .description('Clones a starter')
  .action(start);

program
  .command('add')
  .description('Adds a starter')
  .action(add);

program
  .command('list')
  .description('Prints starter list')
  .action(list);

program
  .command('remove')
  .description('Removes starter')
  .action(remove);

program.parse(process.argv);
