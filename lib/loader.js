var env = require('./env');
var events = require('./events');
var fs = require('fs');
var log = require('winston');
var merge = require('merge');
var path = require('path');

function loadDir(dir) {
  fs.readdirSync(dir).forEach(function(modulePath) {
    log.info('Loading module: ' + modulePath);
    var newModule = require(path.join(dir, modulePath));
    env.config = merge.recursive(false, newModule.config, env.config);
    console.log(env.config);
  });
}

module.exports.load = function load() {
  loadDir(path.join(__dirname, 'core'));
  loadDir(path.join(__dirname, 'plugins'));
  events.emit('loader.finished');
};
