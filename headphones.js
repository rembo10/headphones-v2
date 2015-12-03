#!/usr/bin/env node
var commander = require('commander');
var env = require('./lib/env');
var events = require('./lib/events');
var fs = require('fs');
var loader = require('./lib/loader');
var logger = require('./lib/logger');
var mkdirp = require('mkdirp');
var path = require('path');

function parseArgs(args) {
  commander
    .usage('[options]')
    .option('-q, --quiet', 'Turn off console logging')
    .option('-v, --verbose', 'Include debug level logging in console')
    .option('-p, --port <portNumber>', 'Manually specify port (default: 8181)',
            parseInt)
    .option('--dataDir <path>', 'Specify path to program data directory')
    .option('-c, --config <path>', 'Specify path to configuration file')
    .parse(args);
  return commander;
}

function getDataDir(platform) {
  switch(platform) {
    case 'darwin':
      return path.join(process.env.HOME, 'Library', 'Application Support',
                        'Headphones');
    case 'nt':
      return path.join(process.env.APPDATA, 'Headphones');
    case 'linux':
      return path.join(process.env.HOME, '.headphones');
    case 'freebsd':
      return path.join('usr', 'local', 'headphones', 'data');
  }
}

function readConfig(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  catch (err){
    return null;
  }
}

function writeConfig() {
  fs.writeFileSync(path.join(env.dataDir, 'settings.json'),
                  JSON.stringify(env.config, null, 2));
}

function main(argv) {
  env.argv = argv;
  env.dirName = __dirname;

  env.dataDir = env.argv.dataDir || getDataDir(process.platform);

  try {
    mkdirp.sync(env.dataDir);
  } catch (err) {
    console.error('Error creating data directory: ' + err);
    process.exit(0);
  }

  var configPath = env.argv.config || path.join(env.dataDir, 'settings.json');
  env.config = readConfig(configPath) || {};

  logger.initialize();
  loader.load();
}

process.on('SIGINT', function() {
  writeConfig();
  process.exit(0);
});

if (require.main === module) {
  var argv = parseArgs(process.argv);
  main(argv);
}
