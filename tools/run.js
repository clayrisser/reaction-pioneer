var moment = require('moment');
var winston = require('winston');

var settings = {
  dateFormat: 'HH:MM:ss.SSS',
  diffBy: 'milliseconds'
}

var logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      formatter: (options) => {
        return options.message;
      }
    })
  ]
});

var run = function(task, options) {
  const start = moment();
  logger.info(`[${start.format(settings.dateFormat)}] Starting '${task.name}${options ? `(${options})` : ''}'`);
  return task.job(options).then((res) => {
    const end = moment();
    const time = end.diff(start, settings.diffBy);
    logger.info(`[${end.format(settings.dateFormat)}] Finished '${task.name}${options ? `(${options})` : ''} after ${time} ms'`);
    return res;
  });
}

module.exports = run;

if (require.main === module && process.argv.length > 2) {
  var task = require(`./${process.argv[process.argv.length - 1]}.js`);
  run(task).catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}
