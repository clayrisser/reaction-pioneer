var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');

const config = {
  context: path.resolve(__dirname, '../src/'),
  output: {
    path: path.resolve(__dirname, '../dist/public/assets/'),
    publicPath: 'assets'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src/')],
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015'
          ]
        }
      }
    ]
  },
  plugins: []
};

const clientConfig = _.assign({}, config, {
  entry: './client.jsx',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'client.js'
  }
});

const serverConfig = _.assign({}, config, {
  entry: './server.jsx',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'server.js'
  }
});

module.exports = [clientConfig, serverConfig];
