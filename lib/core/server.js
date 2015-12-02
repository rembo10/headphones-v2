var env = require('../env');
var events = require('../events');
var express = require('express');

module.exports.config = {
  port: 8181,
  host: '::',
  username: '',
  password: '',
  ssl_cert: '',
  ssl_key: '',
  web_root: ''
};

events.on('loader.finished', start);

function start() {
  var app = express();
  app.listen(env.config.server.port);
}
