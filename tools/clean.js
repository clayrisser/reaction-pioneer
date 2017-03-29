var fs = require('fs-extra');

module.exports = {
  name: 'clean',

  job: () => {
    fs.removeSync('./.tmp/');
    fs.removeSync('./dist/');
    return Promise.resolve('cleaned');
  }
};
