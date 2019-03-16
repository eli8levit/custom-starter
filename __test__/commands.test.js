const { EOL } = require('os');
const fs = require('fs-extra');
const { execute, ENTER } = require('./execute');
const { configstore } = require('../lib/utils');

afterAll(() => {
  fs.remove(configstore.path);
});

test('Adds new starter', async () => {
  const starterName = 'newStarter';
  const starterUrl = 'https://github.com/jediyozh/config-files';
  const res = await execute(
    process.cwd() + '/bin/index.js',
    ['add'],
    [starterName, ENTER, starterUrl, ENTER],
  );

  const result = res
    .trim()
    .split(EOL)
    .pop();

  const starters = configstore.get('starters');
  expect(result).toEqual(expect.stringContaining('Saved'));
  expect(starters).toHaveProperty(starterName);
});
