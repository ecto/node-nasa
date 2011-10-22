/*
 * node-nasa
 * Cam Pedersen
 * Oct 21, 2011
 */

var q = require('querystring'),
    r = require('request');

var nasa = {
  /*
   * The base URL for all API calls
   */
  _base: 'http://data.nasa.gov/api/',

  /*
   * Handle all request callbacks
   */
  _handle: function(err, res, body, cb){
    if (err) {
      cb(err);
      return;
    }
    try {
      var body = JSON.parse(body);
    } catch (e) {
      cb(e);
      return;
    }
    if (body.status && body.status == 'error') {
      cb(body.error);
      return;
    }
    cb(null, body);
  },

  /*
   * Fetch single dataset
   */
  dataset: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.id && !options.slug) throw new Error('Must provide id or slug.');
    if (options.id && options.slug) throw new Error('Must provide id OR slug.');
    r(nasa._base + 'get_dataset?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
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
