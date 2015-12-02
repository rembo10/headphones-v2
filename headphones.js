#!/usr/bin/env node
var loader = require('./lib/loader');

function main() {
  loader.load();
}

if (require.main === module) {
  main();
}
