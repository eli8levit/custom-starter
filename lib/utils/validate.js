const execa = require('execa');

module.exports = async value => {
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
