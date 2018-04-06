// var assert = chai.assert;
var assert = require('assert');
var _ = require('../src/main.js');
describe('window._', function() {
  describe('#each()', function() {
    it('Array value is equal to (index + 1)', function() {
      _.each([1, 2, 3], function (value, index) {
        assert.equal(value, index + 1);
      });
    });

    it('Object key is equal to value', function () {
      _.each({
        '2': '2',
        '3': '3'
      },function (pair, index) {
        assert.equal(pair.key, pair.value);
      })
    });
  });
});
