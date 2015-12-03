var env = require('./env');
var events = require('./events');
var fs = require('fs');
var log = require('winston');
var merge = require('merge');
var path = require('path');

function recursiveReadDirSync(dir) {
  var list = [];
  var dirContents = fs.readdirSync(dir);
  var stats;

  dirs = [];

  dirContents.forEach(function (fileOrDir) {
    stats = fs.lstatSync(path.join(dir, fileOrDir));
    if(stats.isDirectory()) {
      dirs.push(path.join(dir, fileOrDir));
    } else {
      list.push(path.join(dir, fileOrDir));
    }
  });

  dirs.forEach(function(dir) {
    list = list.concat(recursiveReadDirSync(dir));
  });

  return list;
}

function loadDir(dir) {

  var files;
  files = recursiveReadDirSync(dir);
  files.forEach(function(file){
    if (file.endsWith('.js')) {
      log.info('Loading module: ' + file);
      var newModule = require(file);
      if (newModule.config) {
        env.config = merge.recursive(false, newModule.config, env.config);
      }
    }
  });
}

module.exports.load = function load() {
  loadDir(path.join(env.dirName, 'lib', 'core'));
  loadDir(path.join(env.dirName, 'lib', 'plugins'));
  events.emit('loader.finished');
};
