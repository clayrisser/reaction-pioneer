let _ = require('lodash');
let browserSync = require('browser-sync');
let childProcess = require('child_process');
let path = require('path');
let webpack = require('webpack');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpackMiddleware = require('webpack-middleware');
let clean = require('./clean');
let logger = require('./logger');
let webpackConfig = require('./webpack.config');

let server = null;

module.exports = function start() {
  return new Promise((resolve, reject) => {
    clean();
    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackMiddleware(bundler, {
      stats: webpackConfig[0].stats,
      publicPath: webpackConfig[0].output.publicPath
    });
    const hotMiddlewares = _.map(_.filter(bundler.compilers, (compiler) => {
      return compiler.options.target !== 'node';
    }), (compiler) => {
      return webpackHotMiddleware(compiler);
    });
    let middleware = [wpMiddleware, ...hotMiddlewares];
    bundler.plugin('done', () => {
      handleServerBundleComplete(middleware, resolve);
    });
  });
};

async function handleServerBundleComplete(middleware, resolve) {
  let serverPath = '';
  await _.map(_.filter(webpackConfig, (item) => item.target === 'node'), (serverConfig) => {
    let output = serverConfig.output;
    serverPath = path.join(output.path, output.filename);
  });
  runServer(serverPath).then((host) => {
    const bs = browserSync.create();
    bs.init({
      proxy: {
        target: host,
        middleware: middleware
      },
      files: ['dist/content/**/*.*']
    }, resolve);
    handleServerBundleComplete = runServer;
  }).catch((err) => {
    logger.error(err);
  });
  process.on('exit', () => {
    if (server) server.kill('SIGTERM');
  });
};

function runServer(serverPath) {
  return new Promise((resolve, reject) => {
    let resolvePending = !!resolve;
    if (server) server.kill('SIGTERM');
    server = childProcess.spawn('node', [serverPath], {
      env: _.assign({NODE_ENV: 'development'}, process.env),
      silent: false
    });
    if (resolvePending) {
      server.once('exit', (code, signal) => {
        if (resolvePending) throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
      });
    }
    server.stdout.on('data', onStdOut);
    server.stderr.on('data', (err) => process.stderr.write(err));
    function onStdOut(data) {
      const time = new Date().toTimeString();
      const match = data.toString('utf8').match(/The server is running at http:\/\/(.*?)\//);
      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
      process.stdout.write(data);
      if (!!match) {
        server.stdout.removeListener('data', onStdOut);
        if (resolve) {
          resolvePending = false;
          resolve(match[1]);
        }
      }
    };
  });
};
