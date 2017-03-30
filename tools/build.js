var webpack = require('webpack');
var clean = require('./clean');
var webpackConfig = require('./webpack.config.js');
var run = require('./run');

module.exports = {
  name: 'build',

  job: async () => {
    await run(clean);
    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err) => {
        if (err) reject(err);
        resolve('built');
      });
    });
  }
};
