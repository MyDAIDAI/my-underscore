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
  },
  /**
   * 返回为true的值, 若为数组，则调用本身filter方法
   * @param obj
   * @param iterator
   * @param context
   * @returns {Array}
   */
  select : function (obj, iterator, context) {
    if (obj.filter) {
      return obj.filter(iterator, context);
    }
    var result = [];
    _.each(obj, function (value, index) {
      if (iterator.call(context, value, index)) {
        result.push(value);
      }
    })
    return result;
  },
  /**
   * 寻找元素是否被包含，包含返回true,否则返回false(基于==)
   * @param obj
   * @param target
   * @returns {*}
   */
  include : function (obj, target) {
    if (obj.includes) {
      return obj.includes(target);
    }
    var isFind = false;
    _.each(obj, function (value, index) {
      if (value == target) {
        isFind = true;
        throw '_break_';
      }
    })
    return isFind;
  },
  /**
   * 返回迭代遍历值
   * @param obj
   * @param memo
   * @param iterator
   * @param context
   * @returns {*}
   */
  inject : function (obj, memo, iterator, context) {
    _.each(obj, function (value, index) {
      memo = iterator.call(obj, memo, value, index);
    });
    return memo
  },
  invoke : function (obj, method) {
    // 从位置为2的地方开始截取字符串
    var args = _.toArray(arguments).slice(2);
    return _.map(obj, function (value) {
      return (method ? value[method] : value).apply(value, args);
    });
  }
}
module.exports = _;
