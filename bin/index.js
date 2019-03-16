#!/usr/bin/env node
'use strict';

const program = require('commander');
const { use, add, list, remove } = require('../lib/commands');

program.version('0.0.1');

program
  .command('use [name]')
  .description('Use a starter, name is optional')
  .action(use);

program
  .command('add')
  .description('Add a new starter')
  .action(add);

program
  .command('list')
  .description('Print starters list')
  .action(list);

program
  .command('remove')
  .description('Remove a starter')
  .action(remove);

program.parse(process.argv);
