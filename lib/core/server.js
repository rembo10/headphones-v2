var env = require('../env');
var events = require('../events');
var express = require('express');

module.exports.config = {
  port: 8181
};

events.on('loader.finished', start);

function start() {
  var app = express();
  app.listen(env.config.server.port);
}
