// test the dataset method

var vows = require('vows'),
    assert = require('assert'),
    nasa = require('../lib/nasa.js');


vows.describe('dataset').addBatch({
    'is a': {
        topic: function () { return nasa.dataset },
        'function': function (topic) {
            assert.equal(typeof topic, 'function');
        }
    },
    'can get': {
        topic: function () { return nasa.dataset },
        'id': {
            '1': function (topic) {
              topic({ id: 1 }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            },
            '20': function (topic) {
              topic({ id: 20 }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            }
        },
        'slug': {
            '20': function (topic) {
              topic({ slug: 20 }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            }
        }
    }
}).export(module);
