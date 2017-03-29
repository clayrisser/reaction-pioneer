var webpack = require('webpack');
var clean = require('./clean');
var webpackConfig = require('./webpack.config.js');
var run = require('./run');

module.exports = {
  name: 'build',

  job: () => {
    return run(clean).then((message) => {
      return new Promise((resolve, reject) => {
        webpack(webpackConfig).run((err) => {
          if (err) reject(err);
          var info = 'built';
          resolve(info);
        });
      });
    });
  }
};
