var _ = require('lodash');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const config = {
  context: path.resolve(__dirname, '../src/'),
  output: {
    path: path.resolve(__dirname, '../dist/public/'),
    publicPath: '/'
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
    filename: '[name].js'
  },
  plugins: DEBUG ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      'process.env.BROWSER': true
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist/'),
      filename: 'assets.js',
      processOutput: (assets) => `module.exports = ${JSON.stringify(assets)};`
    })
  ] : [
    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist/'),
      filename: 'assets.js',
      processOutput: (assets) => `module.exports = ${JSON.stringify(assets)};`
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.jsx?$/,
      minimize: true
    })
  ],
  devtool: DEBUG ? 'source-map' : false
});

const serverConfig = _.merge({}, config, {
  entry: {
    server: './core/server.jsx'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    Buffer: false
  },
  externals: [
    nodeExternals(),
    /^\.\/assets$/
  ],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  plugins: []
});

module.exports = [clientConfig, serverConfig];
