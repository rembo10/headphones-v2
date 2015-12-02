var env = require('./env');
var events = require('./events');
var fs = require('fs');
var path = require('path');

function loadDir(dir) {
  fs.readdirSync(dir).forEach(function(modulePath) {
    var moduleName = modulePath.slice(0,-3);
    var newModule = require(path.join(dir, moduleName));
    env.config[moduleName] = newModule.config;
  });
}

module.exports.load = function load() {
  loadDir(path.join(__dirname, 'core'));
  loadDir(path.join(__dirname, 'plugins'));
  events.emit('loader.finished');
};
