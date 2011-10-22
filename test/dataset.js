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
            '1619': function (topic) {
              topic({ id: 619 }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            }
        },
        'slug': {
            'great-images-in-nasa': function (topic) {
              topic({ slug: 'great-images-in-nasa' }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            }
        }
    },
    'can not get': {
        topic: function () { return nasa.dataset },
        'id': {
            '1': function (topic) {
              topic({ id: 1 }, function(err, data){
                assert.notEqual(err, null);
                assert.notEqual(data.status, 'ok'); 
              });
            }
        },
        'slug': {
            'unidentified-flying-objects': function (topic) {
              topic({ slug: 'unidentified-flying-objects' }, function(err, data){
                assert.equal(err, null);
                assert.equal(data.status, 'ok'); 
              });
            }
        }
    }
}).export(module);
