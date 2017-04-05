const webpack = require('webpack');
const clean = require('./clean');
const copy = require('./copy');
const logger = require('./logger').noLabel;
const run = require('./run');
const webpackConfig = require('./webpack.config.js');

async function build() {
  await run(clean);
  return new Promise((resolve, reject) => {
    try {
      webpack(webpackConfig).run(async (err, stats) => {
        if (err) reject(err);
        logger.info(stats.toString(webpackConfig[0].stats));
        await run(copy);
        resolve('built');
      });
    } catch(err) {
      reject(err);
    }
  }).catch((err) => {
    logger.error(err);
  });
}

module.exports = {
  name: 'build',
  job: build
};
