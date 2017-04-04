const fs = require('fs-extra-promise');
const path = require('path');

async function copy() {
  var root = path.resolve(__dirname, '../');
  await Promise.all([
    fs.copy(`${root}/src/public/`, `${root}/dist/public/`)
  ]);
  return 'copied';
}

module.exports = {
  name: 'copy',
  job: copy
};
