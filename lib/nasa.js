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

  dataset: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.id && !options.slug) throw new Error('Must provide id or slug.');
    if (options.id && options.slug) throw new Error('Must provide id OR slug.');
    r(nasa._base + 'get_dataset?/' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },
  
  /*
   * Execute a search query.
   * API function: .get_search_results
   * 
   * nasa.query(options, callback);
   *
   * options = {
   *   query: 'query',
   *   [count]: 15      // optional, default is 10
   *  }
   *
   */
  search: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.query && !options.search) throw new Error('You oughta provide a search query.');
    if (options.query) options.search = options.query;
    r(nasa._base + 'get_search_results/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },

  recent: function(options, cb){
    r(nasa._base + 'get_recent_datasets/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });

  },


  dates: function(cb){

    r(nasa._base + 'get_date_index', function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },

  date: function(options, cb){
    r(nasa._base + 'get_date_datasets/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });

  },

  /*
   * Returns an array of datasets in a specific category.
   * API function: .get_category_datasets
   * 
   * nasa.datasets(options, callback);
   *
   * options = {
   *   [id|slug]: id or slug of category,
   *   [count]: 15  // optional, default is 10
   *  }
   *
   */
  datasets: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.criteria) throw new Error('I don\'t know what criteria to search on. Is it by date, category, or tag?');
    if (!options.id && !options.slug) throw new Error('Must provide id or slug.');
    if (options.id && options.slug) throw new Error('One or the other: id OR slug. Save some bytes.');

    // determine criteria
    switch(options.criteria) {
      case 'category':
        fn_call = 'get_category_datasets';
        break;
      case 'tag':
        fn_call = 'get_tag_datasets';
        break;
      case 'date':
        fn_call = 'get_date_datasets';
        break;
      default:
        throw new Error('criteria must be either category, tag, or date.');
        break;
    }

    r(nasa._base + fn_call + '/?' + q.stringify(options), function(err, res, body){
      console.log(body);
      nasa._handle(err, res, body, cb);
    });
  },


  tags: function(cb){

    r(nasa._base + 'get_tag_index' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },

  tag: function(options, cb){

    r(nasa._base + 'get_tag_datasets/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },
}

module.exports = nasa;
