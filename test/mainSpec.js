var chai = require('chai');
var assert = chai.assert;
var _ = require('../src/main.js');
describe('_', function() {
  describe('each()', function() {
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

  describe('any()', function () {
    it('[1, 2, 2] should be true', function () {
      var result = _.any([1, 2, 2], function (value, index) {
        return value === index;
      })
      assert.isTrue(result);
    });
    it('{1: 0, 2: 0, 3: 3} should be true', function () {
      var result = _.any({
        '1': 0,
        '2': 0,
        '3': '3'
      }, function (pair, index) {
        return pair.value === pair.key;
      })
      assert.isTrue(result);
    })
  });
});
