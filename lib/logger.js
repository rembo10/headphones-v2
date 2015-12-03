var winston = require('winston');
var colors = require('colors');
var printf = require('printf');
var path = require('path');
var env = require('./env');

var formatter = function(options) {
  var level = options.level.toUpperCase();
  level = printf('%-8s', '[' + level + ']');
  switch (options.level) {
    case 'debug':
      level = level.green;
      message = options.message.green;
      break;
    case 'info':
      level = level.blue;
      message = options.message.blue;
      break;
    case 'warn':
      level = level.yellow.bold;
      message = options.message.yellow.bold;
      break;
    default:
      level = level.red.bold;
      message = options.message.red.bold;
  }
  var date = new Date();
  var timestamp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  return timestamp.bold + '  ' + level + ' ' + message;
};

module.exports.initialize = function() {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.File, {
    filename: path.join(env.dataDir, 'headphones.log')
  });
  if(!env.argv.quiet) {
    var level = 'info';
    if(env.argv.verbose) {
      level = 'debug';
    }
    winston.add(winston.transports.Console, {
      formatter: formatter,
      level: level,
      colorize:true
    });
  }
};
