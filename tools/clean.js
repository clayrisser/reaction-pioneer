let fs = require('fs-extra');
let logger = require('./logger');

module.exports = function clean() {
  fs.removeSync('./.tmp/');
  fs.removeSync('./dist/');
  let info = 'cleaned';
  logger.info(info);
  return Promise.resolve(info);
};
