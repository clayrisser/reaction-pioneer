var _ = require('lodash');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var webpack = require('webpack');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

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
        options: JSON.stringify({
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          plugins: DEBUG ? [
            'transform-runtime',
            'babel-plugin-transform-async-to-generator'
          ] : [
            'transform-runtime',
            'babel-plugin-transform-async-to-generator',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ]
        })
      }
    ]
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
    path: path.resolve(__dirname, '../dist/public/'),
    filename: 'client.js'
  },
  plugins: DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.jsx?$/,
      minimize: true
    })
  ]
});

const serverConfig = _.merge({}, config, {
  entry: './core/server.jsx',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    Buffer: false
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'server.js'
  },
  plugins: []
});

module.exports = [clientConfig, serverConfig];
