#!/usr/bin/env node
'use strict';

const program = require('commander');
const { start, add, list, remove } = require('../lib/commands');

program.version('0.0.1');

program
  .command('start [name]')
  .description('Clones a starter. Name is optional')
  .action(start);

program
  .command('add')
  .description('Add a new starter')
  .action(add);

program
  .command('list')
  .description('Print starter list')
  .action(list);

program
  .command('remove')
  .description('Remove a starter')
  .action(remove);

program.parse(process.argv);
