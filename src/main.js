module.exports = {
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
      obj.every(iterator, context);
    }
    var result = true;
    _.each(obj, function (value, index) {
      result = result && iterator.call(context, value, index);
      if (!result) {
        throw '_break';
      }
    });
    return result;
  }
}

