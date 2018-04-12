var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
var _ = require('../src/main.js');
describe('_', function() {
  //each测试
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
  //any测试
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
  // map测试
  describe('map()', function () {
    it('[1, 2, 3] should be [2, 4, 6]', function () {
      var result = _.map([1, 2, 3], function (value, index) {
        return value * 2;
      });
      expect(result).to.deep.equal([2, 4, 6]);
    });
    it('object 数组对象返回', function () {
      var result = _.map({
        '1': '1',
        '2': '2'
      }, function (pair, index) {
        return pair.key = pair.value + 's';
      });
      expect(result).to.deep.equal(['1s', '2s']);
    });
  });
  // detect测试
  describe('detect()', function () {
    it('[1, 2, 3] should be 3', function () {
      var result = _.detect([1, 2, 3], function (value, index) {
        return value - 3;
      });
      expect(result).to.equal(2);
    });
    it('object 数组对象返回', function () {
      var result = _.detect({
        '1': '1',
        '2': '2'
      }, function (pair, index) {
        return pair;
      });
      expect(result).to.deep.equal(['2', '2']);
    });
  });
});
