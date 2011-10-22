/*
 * node-nasa
 * Cam Pedersen
 * Oct 21, 2011
 */

var q = require('querystring');

var nasa = {
  _base: 'http://data.nasa.gov/api/',

  dataset: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.id && !options.slug) throw new Error('Must provide id or slug.');
    if (options.id && options.slug) throw new Error('Must provide id OR slug.');
    request(nasa._base + 'get_recent_datasets?' + q.stringify(options), cb);
  },

  recent: function(){

  },


  date: function(){

  },

  category: function(){

  },

  search: function(){

  },

  dates: function(){

  },

  categories: function(){

  },

  tags: function(){

  },
}

module.exports = nasa;
