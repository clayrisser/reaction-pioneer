var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

webpack(webpackConfig).run((err) => {
  if (err) return console.error(err);
  console.log('reaction built');
});
