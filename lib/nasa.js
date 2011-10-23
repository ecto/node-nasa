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
   * Returns a single dataset
   *
   * nasa.dataset(options, callback);
   *
   * options = {
   *   [id|slug] = id or slug of the dataset
   * }
   */
  dataset: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');

    // allow nasa.dataset(1) or nasa.dataset('saturn')
    if (typeof(options) == 'number') {
      options = {id: options}
    } else if (typeof(options) == 'string') {
      options = {slug: options}
    }

    if (!options.id && !options.slug) throw new Error('Must provide id or slug.');
    if (options.id && options.slug) throw new Error('Must provide id OR slug.');
    r(nasa._base + 'get_dataset/?' + q.stringify(options), function(err, res, body){
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
    
    // allow nasa.search(1) or nasa.search('saturn')
    if (typeof(options) == 'string') {
      options = {search: options}
    }

    if (!options.query && !options.search) throw new Error('You oughta provide a search query.');
    if (options.query) options.search = options.query;
    r(nasa._base + 'get_search_results/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },

  /*
   * Returns recent datasets.
   *
   * It's your lucky day. You don't have to pass any parameters AT ALL.
   * That's right. Pay nothing today and pay 18 easy installments of ABSOLUTELY NOTHING.
   * Unless if you want to, of course. You can pass a count. But by default, that's set to 10.
   * Go crazy.
   *
   * nasa.recent(options, callback);
   */
  recent: function(options, cb){
    r(nasa._base + 'get_recent_datasets/?' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });

  },

  /*
   * Returns both an array of date permalinks and a tree structure representation of the archive.
   *
   * No parameters accepted.
   *
   * nasa.dates(callback);
   */
  dates: function(cb){
    r(nasa._base + 'get_date_index', function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },

  /*
   * Returns an array of datasets, depending on what criteria.
   * 
   * criteria can be:
   * - category (get_category_datasets)
   *   { id|slug: id or slug of category }
   * - tag (get_tag_datasets)
   *   { id|slug: id or slug of tag }
   * - date (get_date_datasets)
   *   { date: format YYYY or YYYY-MM or YYYY-MM-DD }
   * 
   * also allows optional count, default is 10.
   * 
   * nasa.datasets(options, callback);
   *
   * options = {
   *   criteria: search on category, tag, or date,
   *   [id|slug|date]: the query, either id or slug for category/tag, or date for date (see above),
   *   [count]: 15  // optional, default is 10
   *  }
   *
   */
  datasets: function(options, cb){
    if (!options || !cb) throw new Error('Must pass in options and callback.');
    if (!options.criteria) throw new Error('I don\'t know what criteria to search on. Is it by date, category, or tag?');
    if (options.criteria != 'date' && (!options.id && !options.slug)) throw new Error('Must provide id or slug.');
    if (options.criteria == 'date' && !options.date) throw new Error('Searching by criteria date, without a date, is ineffective.');
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

  /*
   * Returns an array of active tags.
   *
   * No arguments accepted. Sorry folks, we're closed.
   *
   * nasa.tags(callback);
   */
  tags: function(cb){

    r(nasa._base + 'get_tag_index' + q.stringify(options), function(err, res, body){
      nasa._handle(err, res, body, cb);
    });
  },
}

module.exports = nasa;
