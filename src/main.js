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
   * 返回最后一个遍历器返回为true的值
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
   * 返回iterator执行后返回为true的值, 若为数组，则调用本身filter方法
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
   * @param memo reduce的初始值
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
  /**
   * 在obj的每一个元素上执行method方法
   * @param obj
   * @param method 方法名
   * @returns {*}
   */
  invoke : function (obj, method) {
    // 从位置为2的地方开始截取字符串
    var args = _.toArray(arguments).slice(2);
    return _.map(obj, function (value) {
      // 判断method是否存在，存在则以args为参数，调用每一项的method方法
      return (method ? value[method] : value).apply(value, args);
    });
  },
  /**
   * 返回遍历器返回的最大值，或者obj内容中的最大值
   * @param obj
   * @param iterator
   * @param context
   * @returns {*}
   */
  max : function (obj, iterator, context) {
    var result;
    _.each(obj, function (value, index) {
      value = iterator ? iterator.call(context, value, index) : value;
      if (result == null || value >= result) {
        result = value;
      }
    });
    return result;
  },
  /**
   * 获取遍历器返回中的最小值或者obj中的最小值
   * @param obj
   * @param iterator
   * @param context
   * @returns {*}
   */
  min : function (obj, iterator, context) {
    var result;
    _.each(obj, function (value, index) {
      value = iterator ? iterator.call(context, value, index) : value;
      if (result == null || value <= result) {
        result = value;
      }
    });
    return result;
  },
  /**
   * 返回对象中所有键名为key的值的数组
   * @param obj
   * @param key
   * @returns {Array}
   */
  pluck : function (obj, key) {
    var result = [];
    _.each(obj, function (value, index) {
      result.push(value[key]);
    });
    return result;
  },
  /**
   * 返回obj中没有通过iterator的值
   * @param obj
   * @param iterator
   * @param context
   * @returns {Array}
   */
  reject : function (obj, iterator, context) {
    var result = []
    _.each(obj, function (value, index) {
      if (!iterator.call(context, value, index)) {
        result.push(value)
      }
    });
    return result;
  },
  /**
   * 返回一个排序后的obj拷贝副本，如果传递iterator参数，
   * iterator将作为obj中每个值的排序依据
   * @param obj
   * @param iterator
   * @param context
   */
  sortBy : function (obj, iterator, context) {
    _.pluck(_.map(obj, function (value, index) {
      return {
        value: value,
        criteria: iterator ? iterator.call(context, value, index) : value
      };
    }).sort(function (left, right) {
      var a = left.criteria;
      var b = right.criteria;
      return a < b ? -1 : a > b ? 1: 0
    }), 'value')
  },
  // TODO sortedIndex 查找对象在数组中的index
  /**
   * 将任何可以迭代的对象转换为数组
   * @param iterable
   */
  toArray : function (iterable) {
    if (!iterable) {
      return [];
    }
    if (_.isArray(iterable)) {
      return iterable;
    }
    // 若es6中的额Array.from存在，则调用此方法
    if (Array.from) {
      return Array.from(iterable);
    }
    return _.map(iterable, function (value) {
      return value
    });
  },
  /**
   * 返回obj对象的长度
   * @param obj
   * @returns {*}
   */
  size : function (obj) {
    return _.toArray(obj).length
  },
  //--------------------The following methods only apply to arrays----------------//
  /**
   * 返回数组的第一个元素
   * @param arr
   * @returns {*}
   */
  first : function (arr) {
    return arr[0];
  },
  /**
   * 返回数组的最后一个元素
   * @param arr
   * @returns {*}
   */
  last : function (arr) {
    return arr[arr.length - 1];
  },
  /**
   * 返回本身为true的值组成的数组
   * @param arr
   * @returns {*|Array}
   */
  compact : function (arr) {
    return _.select(arr, function (value) {
      return !!value;
    })
  },
  /**
   * 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组
   * @param array
   * @returns {*}
   */
  flatten : function (array) {
    return _.inject(array, [], function (memo, value) {
      if (_.isArray(value)) {
        return memo.concat(_.flatten(value));
      }
      memo.push(value);
      return memo;
    });
  },
  /**
   * 返回一个删除所有values值后的 array副本
   * @param array
   * @returns {*|Array}
   */
  without : function (array) {
    var values = array.silce.call(arguments, 0);
    return _.select(function (value) {
      return !_.include(values, value);
    });
  },
  /**
   * 返回 array去重后的副本
   * @param array
   * @param sorted
   * @returns {*}
   */
  uniq : function (array, sorted) {
    return _.inject(array, [], function (memo, el, i) {
      // 已经排序元素只需要取出最后一个值进行比较即可
      if (0 === i || (sorted ? _.last(memo) !== el : !_.include(memo, el))) {
        memo.push(el);
      }
      return memo;
    });
  },
  /**
   * 返回传入 arrays（数组）交集
   * @param array1
   * @param array2
   * @returns {*|Array}
   */
  intersect : function (array1, array2) {
    return _.select(_.uniq(array1), function (item1) {
      return _.detect(array2, function (item2) {
        return item1 === item2;
      });
    });
  }
}
module.exports = _;
