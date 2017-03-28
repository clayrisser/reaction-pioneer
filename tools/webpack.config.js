let _ = require('lodash');
let nodeExternals = require('webpack-node-externals');
let path = require('path');
let webpack = require('webpack');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const config = {
  context: path.resolve(__dirname, '../src/'),
  output: {
    path: path.resolve(__dirname, '../dist/public/assets/'),
    publicPath: 'assets'
  },
  module: {
    loaders: []
  },
  plugins: [],
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const clientConfig = _.merge({}, config, {
  entry: './core/client.jsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'client.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src/')],
        loader: 'babel-loader',
        options: JSON.stringify({
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015'
          ]
        })
      }
    ]
  },
  plugins: []
});

const serverConfig = _.merge({}, config, {
  entry: './core/server.jsx',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src/')],
        loader: 'babel-loader',
        options: JSON.stringify({
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'node5'
          ]
        })
      }
    ]
  },
  plugins: []
});

module.exports = [clientConfig, serverConfig];
