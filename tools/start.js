var webpack = require('webpack');
var webpackMiddleware = require('webpack-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.js');
var runServer = require('./runServer');
var browserSync = require('browser-sync');
var logger = require('./logger');
var _ = require('lodash');
var run = require('./run');
var clean = require('./clean');

module.exports = {
  name: 'start',
  job: start
};

async function start() {
  await run(clean);
  webpackConfig[0] = injectClientConfig(webpackConfig[0]);
  const bundler = webpack(webpackConfig);
  const wp = webpackMiddleware(bundler, {
    stats: webpackConfig[0].stats,
    serverSideRender: true,
    publicPath: webpackConfig[0].output.publicPath
  });
  const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);
  var middleware = [wp, hotMiddleware];
  bundler.plugin('done', (stats) => {
    handleServerBundleComplete(middleware, stats);
  });
}

var handleServerBundleComplete = (middleware, stats) => {
  handleServerBundleComplete = (middleware, stats) => {
    !stats.stats[1].compilation.errors.length && runServer('./dist/server.js');
  };
  runServer('./dist/server.js').then((host) => {
    const bs = browserSync.create();
    bs.init({
      proxy: {
        target: host,
        middleware: middleware
      },
      files: ['dist/content/**/*.*']
    });
  }, (err) => logger.error(err));
};

function injectClientConfig(clientConfig) {
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
