_ = {
  /**
   * 数组，对象，NodeList遍历
   * @param obj
   * @param iterator
   * @param context
   * @returns {*}
   */
  each : function (obj, iterator, context) {
    var index = 0;
    try {
      if (obj.forEach) {
        obj.forEach(iterator, context);
      } else if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          iterator.call(context, obj[i], i);
        }
      } else if (obj._each) {
        obj._each(function (value) {
          iterator.call(context, value, index++);
        })
      } else {
        var i = 0;
        for (var key in obj) {
          var value = obj[key], pair = [key, value];
          pair.key = key;
          pair.value = value;
          iterator.call(context, pair, i++);
        }
      }
    } catch (e) {
      if (e !== '_break_') {
        throw e;
      }
    }
    return obj;
  },
  /**
   * 有一个为false都返回false
   * @param obj
   * @param iterator
   * @param context
   * @returns {boolean}
   */
  all : function (obj, iterator, context) {
    if (obj.every) {
      return obj.every(iterator, context);
    }
    var result = true;
    _.each(obj, function (value, index) {
      result = result && iterator.call(context, value, index);
      if (!result) {
        throw '_break';
      }
    });
    return result;
  },
  /**
   * 有一个为true则为true
   * @param obj
   * @param iterator
   * @param context
   */
  any : function (obj, iterator, context) {
    if (obj.some) {
      return obj.some(iterator, context);
    }
    var result = false;
    _.each(obj, function (value, index) {
      //有一个执行的结果为true，就将结果返回，不再继续执行下面的遍历操作
      if (result = !!iterator.call(context, value, index)) {
        throw '_break_';
      }
    });
    return result;
  },
  /**
   * 返回依次执行遍历器函数的结果
   * @param obj
   * @param iterator
   * @param context
   */
  map : function (obj, iterator, context) {
    if (obj.map) {
      return obj.map(iterator, context);
    }
    var results = [];
    _.each(obj, function (value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  },
  /**
   * 返回第一个遍历器返回为true的值
   * @param obj
   * @param iterator
   * @param context
   * @returns {string}
   */
  detect : function (obj, iterator, context) {
    var result = '';
    _.each(obj, function (value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
      }
    });
    return result;
  }
}
module.exports = _;
