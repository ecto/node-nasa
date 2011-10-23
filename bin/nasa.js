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
    program.prompt('Search term: ', function(term){
      nasa.search({ search: term }, function(err, data){
        if (err) {
          console.log(err);
          process.exit();
        } else if (data.posts) {
          console.log(data.count + ' datasets were found matching "' + term + '"');
          var titles = [];
          for (var i in data.posts) {
            titles.push(data.posts[i].title);
          }
          program.choose(titles, function(i){
            console.log(data.posts[i]);
          });
        } else {
          console.log('Sorry, there were no datasets found matching "' + term + '"');
          methods.search();
        }
      });
    });
  },

  quit: function(){
    process.exit();
  }
}

console.log('What do you want to do?');
program.choose(Object.keys(methods), function(i){
  methods[Object.keys(methods)[i]]();
});

