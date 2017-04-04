const _ = require('lodash');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-middleware');
const clean = require('./clean');
const copy = require('./copy');
const logger = require('./logger').withLabel;
const run = require('./run');
const runServer = require('./runServer');
const webpackConfig = require('./webpack.config.js');

const DEBUG = !process.argv.includes('--release');

async function start() {
  await run(clean);
  webpackConfig[0] = patchClientConfig(webpackConfig[0]);
  const bundler = webpack(webpackConfig);
  const wp = webpackMiddleware(bundler, {
    stats: webpackConfig[0].stats,
    serverSideRender: true,
    publicPath: webpackConfig[0].output.publicPath
  });
  const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);
  var middleware = [wp, hotMiddleware];
  bundler.plugin('done', (stats) => {
    handleBundleComplete(middleware, stats);
  });
}

module.exports = {
  name: 'start',
  job: start
};

var handleBundleComplete = async (middleware, stats) => {
  handleBundleComplete = (middleware, stats) => {
    !stats.stats[1].compilation.errors.length && runServer('./dist/server.js');
  };
  await run(copy);
  runServer('./dist/server.js').then((host) => {
    const bs = browserSync.create();
    bs.init({
      proxy: {
        target: host,
        middleware: middleware
      }
    });
  }, (err) => logger.error(err));
};

function patchClientConfig(clientConfig) {
  clientConfig.entry = ['webpack-hot-middleware/client'].concat(clientConfig.entry);
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  var babelLoader = _.filter(clientConfig.module.loaders, (loader) => loader.loader === 'babel-loader')[0];
  var babelLoaderOptions = JSON.parse(babelLoader.options);
  babelLoaderOptions.plugins.push(['react-transform', {
    transforms: [
      {
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      },
    ]
  }]);
  babelLoader.options = JSON.stringify(babelLoaderOptions);
  return clientConfig;
}
