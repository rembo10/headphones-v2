#!/usr/bin/env node
var loader = require('./lib/loader');
var logger = require('./lib/logger');

function main() {
  logger.initialize();
  loader.load();
}

if (require.main === module) {
  main();
}
