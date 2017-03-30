var fs = require('fs-extra-promise');
var path = require('path');

module.exports = {
  name: 'copy',

  job: async () => {
    var root = path.resolve(__dirname, '../');
    await Promise.all([
      fs.mkdirp(`${root}/dist/styles/`),
      fs.mkdirp(`${root}/dist/scripts/`)
    ]);
    await Promise.all([
      fs.copy(`${root}/src/public/`, `${root}/dist/`)
    ]);
    return 'copied';
  }
};
