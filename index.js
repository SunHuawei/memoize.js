/*
 * memoize.js
 * by @SunHuawei
 * Released under an MIT license.
 */
(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('memoize', this, function() {
  function memoize(fn) {
    var lastArgs = [];
    var lastResult = null;

    return function () {
      var args = [].slice.call(arguments);

      if (_eq(args, lastArgs)) {
        return lastResult;
      }

      var result = fn.apply(undefined, args);
      lastArgs = args;
      lastResult = result;

      return result;
    };
  };

  function _eq(args1, args2) {
    if (!args1 || !args2 || args1.length !== args2.length) return false;
    for(var i = 0; i < args1.length; i++) {
      if (args1[i] !== args2[i]) {
        return false;
      }
    }

    return true;
  };

  return memoize;
})