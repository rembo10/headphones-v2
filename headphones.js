#!/usr/bin/env node
var commander = require('commander');
var env = require('./lib/env');
var loader = require('./lib/loader');
var logger = require('./lib/logger');

function main() {

  commander
    .usage('[options]')
    .option('-q, --quiet', 'Turn off console logging')
    .option('-v, --verbose', 'Increase console logging')
    .option('-p, --port <portNumber>', 'Manually specify port (default: 8181)', parseInt)
    .parse(process.argv);

  env.argv = commander;

  logger.initialize();
  loader.load();
}

if (require.main === module) {
  main();
}
