let webpack = require('webpack');
let clean = require('./clean');
let logger = require('./logger');
let webpackConfig = require('./webpack.config.js');

module.exports = function() {
  return clean().then((message) => {
    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err) => {
        if (err) reject(err);
        let info = 'built';
        logger.info(info);
        resolve(info);
      });
    });
  }).catch((err) => {
    logger.error(err);
  });
};
