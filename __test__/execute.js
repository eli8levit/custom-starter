const concat = require('concat-stream');
const { spawn } = require('child_process');

function executeWithInput(processPath, args = [], inputs = []) {
  const timeout = 100;
  const combinedEnv = {
    ...process.env,
    NODE_ENV: 'test',
  };
  const childProcess = spawn('node', [processPath, ...args], { env: combinedEnv });
  childProcess.stdin.setEncoding('utf-8');

  let currentInputTimeout;

  const loop = inputs => {
    if (!inputs.length) {
      childProcess.stdin.end();
      return;
    }
    currentInputTimeout = setTimeout(() => {
      childProcess.stdin.write(inputs[0]);
      loop(inputs.slice(1));
    }, timeout);
  };

  return new Promise((resolve, reject) => {
    childProcess.stderr.once('data', err => {
      childProcess.stdin.end();
      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout);
        inputs = [];
      }
      reject(err.toString());
    });
    childProcess.on('error', reject);
    loop(inputs);
    childProcess.stdout.pipe(concat(result => resolve(result.toString())));
  });
}

module.exports = {
  execute: executeWithInput,
  DOWN: '\x1B\x5B\x42',
  UP: '\x1B\x5B\x41',
  ENTER: '\x0D',
  SPACE: '\x20',
};
