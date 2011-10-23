#!/usr/bin/env node
/*
 * NASA API command line tool
 * Cam Pedersen
 * October 22, 2011
 */

var program = require('commander'),
    nasa = require('../lib/nasa.js');

program
  .version('0.0.1')
  .option('-j, --json', 'Output as JSON')
  .parse(process.argv);

var methods = {
  search: function(){
    program.prompt('What do you want to search for?', console.log);
  },

  quit: function(){
    process.exit();
  }
}

console.log('What do you want to do?');
program.choose(Object.keys(methods), function(i){
  methods[Object.keys(methods)[i]]();
});
