/*!
 * PageCache
 *
 * Released under the MIT license, powered By jQuery
 *
 * JokinKuang
 * 2016-08-08
 */
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("PageCache requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
    // Pass this if window is not defined yet
    // Jokin: upper factory === function(window, noGlobal), if noGlobal is false
    // means this Object is Global which can access by window.$PC or $PC or PageCache
    // if noGlobal is true means PageCache is one part of other modules
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var Log = function() {
    Log.prototype = {
      level: 1,
      DEBUG: 2,
      INFO: 1,
      ERROR: 0,
      _log: function(level, info) {
        if (Log.level >= level && console) {
          console.log(info);
        }
      },
      error: function(info) {
        _log(Log.ERROR, "[ERROR]>>" + info);
      },
      info: function(info) {
        _log(Log.INFO, "[INFO]>>" + info);
      },
      debug: function(info) {
        _log(Log.DEBUG, "[DEBUG]>>" + info);
      }
    }
  };

  //Object Init
  var PageCache = function(url, isForce, callback, errCallback) {
    // $PC() or $PC("")
    if (! url) {
      return this;
    }

    // $PC("url") or $PC("url", false)
    if (! isForce) {
      isForce = false;
    }

    // Get From PageCache
    if (! isForce) {
      if (PageCache.cache[url]) {
        callback(PageCache.cache[url]);
        return this;
      }
    }

    // Run
    _doAjax(url, callback, errCallback);
  }

  // Functions
  PageCache.fn = PageCache.prototype = {
    _toJson: function(text) {
      var json = eval('(' + _xmlhttp.responseText + ')');
      Log.debug("toJson:"+json);
      return json;
    },
    _doAjax: function(url, callback, errCallback) {
      var _xmlhttp;
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
          _xmlhttp = new XMLHttpRequest();
      } else { // code for IE6, IE5
          _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      _xmlhttp.onreadystatechange = function() {
          if (_xmlhttp.readyState == 4) {
            if (_xmlhttp.status == 200) {
              Log.debug(_xmlhttp.responseText);
              callback(_toJson(_xmlhttp.responseText), _xmlhttp.status, _xmlhttp);
            } else {
              Log.error(_xmlhttp.status + "|" + _xmlhttp.responseText);
              errCallback(_xmlhttp.responseText, _xmlhttp.status, _xmlhttp);
            }
          }
      }
      _xmlhttp.open("GET", url, true);
      _xmlhttp.send();
    }
  };

  var
    // Map over PageCache in case of overwrite
    _PageCache = window.PageCache,

    // Map over the $PC in case of overwrite
    _$PC = window.$PC;

  PageCache.noConflict = function(deep) {
      if (window.$PC === PageCache) {
          window.$PC = _$PC;
      }
      if (deep && window.PageCache === PageCache) {
          window.PageCache = _PageCache;
      }
      return PageCache;
  };

  if (!noGlobal) {
      window.PageCache = window.$PC = PageCache;
      window.PageCache.Log = window.$PC.Log = Log;
  }
});
