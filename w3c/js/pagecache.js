/*!
 * PageCache v0.01
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
  var Log = {
      DEBUG: 2,
      INFO: 1,
      ERROR: 0,
      level: 1,
      owner: "[PageCache]",
      _log: function(level, info) {
        if (Log.level >= level && console) {
          console.log(info);
        }
      },
      error: function(info, obj) {
        if (typeof(info) === 'string') {
          Log._log(Log.ERROR, Log.owner + "[ERROR]>>" + info);
        } else {
          obj = info;
          info = "";
        }
        if (obj) {
          Log._log(Log.ERROR, obj);
        }
      },
      info: function(info, obj) {
        if (typeof(info) === 'string') {
          Log._log(Log.INFO, Log.owner + "[INFO]>>" + info);
        } else {
          obj = info;
          info = "";
        }
        if (obj) {
          Log._log(Log.INFO, obj);
        }
      },
      debug: function(info, obj) {
        if (typeof(info) === 'string') {
          Log._log(Log.DEBUG, Log.owner + "[DEBUG]>>" + info);
        } else {
          obj = info;
          info = "";
        }
        if (obj) {
          Log._log(Log.DEBUG, obj);
        }
      }
  };

  //Object Init
  var PageCache = function(url, isForce, callback, errCallback) {
    // $PC() or $PC("")
    if (! url) {
      return this;
    }

    // $PC("url", callback) or $PC("url", callback, errCallback)
    if (typeof(isForce) === 'function') {
        callback = isForce;
    }
    if (typeof(isForce) === 'function' && typeof(callback) === 'function') {
        callback = isForce;
        errCallback = callback;
    }

    // $PC("url") or $PC("url", false) or $PC("url", callback)
    if (typeof(isForce) === 'function' || ! isForce) {
      isForce = false;
    }

    // Get From PageCache
    if (! isForce) {
      if (PageCache.cache[url] && PageCache.cache[url].state == 1) {
        Log.debug("cache hit: " + url);
        if (callback) {
          callback(PageCache.cache[url]);
        }
        return this;
      }
      if (PageCache.cache[url] && PageCache.cache[url].state == 0) {
        Log.debug("cache hit but still requesting: " + url);
        if (callback) {
          PageCache.cache[url].funs.push(callback);
        }
        if (errCallback) {
          PageCache.cache[url].errFuns.push(errCallback);
        }
        return this;
      }
      Log.debug("cache Not hit: " + url)
    }

    // new CacheData
    PageCache.cache[url] = new CacheData(url, callback, errCallback);

    // Run
    PageCache.fn.doAjax(url);
  }

  // Cache Structure
  PageCache.cache = {
  };
  function CacheData(url, func, errFunc){
    this.url = url;
    this.funs = [];
    if (func) {
      this.funs.push(func);
    };
    this.errFuns = [];
    if (errFunc) {
      this.errFuns.push(errFunc);
    }
    this.state = 0;
    this.response = "";
    this.json = {};
  }

  // Functions
  PageCache.fn = PageCache.prototype = {
    _toJson: function(text) {
      var json = eval('(' + text + ')');
      Log.debug("toJson:", json);
      return json;
    },
    doAjax: function(url) {
      var _xmlhttp;
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
          _xmlhttp = new XMLHttpRequest();
      } else {                    // code for IE6, IE5
          _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      _xmlhttp.onreadystatechange = function() {
          if (_xmlhttp.readyState == 4) {
            if (_xmlhttp.status == 200) {
              var _cacheData = PageCache.cache[_xmlhttp.responseURL];
              if (! _cacheData) {
                Log.error("Error Occur");
                return;
              }
              _cacheData.state = 1;
              _cacheData.response = _xmlhttp.responseText;
              _cacheData.json = PageCache.fn._toJson(_xmlhttp.responseText);

              Log.debug(PageCache.cache);

              for (var i in _cacheData.funs) {
                if (_cacheData.funs[i]) {
                  _cacheData.funs[i](_cacheData.json, _xmlhttp.status, _xmlhttp);
                }
              }
            } else {
              Log.debug(_xmlhttp);
              var _cacheData = PageCache.cache[_xmlhttp.responseURL];
              if (! _cacheData) {
                Log.error("Error Occur");
                return;
              }
              _cacheData.state = 0;
              _cacheData.response = _xmlhttp.responseText;
              _cacheData.json = {};

              Log.error(_xmlhttp.status + "|" + _xmlhttp.responseText);

              for (var i in _cacheData.errFuns) {
                if (_cacheData.errFuns[i]) {
                  _cacheData.errFuns[i](_xmlhttp.status, _xmlhttp);
                }
              }
            }
          }
      }
      _xmlhttp.open("GET", url, true);
      _xmlhttp.setRequestHeader("Origin","*");
      Log.debug(_xmlhttp);
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

  if (! noGlobal) {
      window.PageCache = window.$PC = PageCache;
      window.PageCache.Log = window.$PC.Log = Log;
  }

return PageCache;
});
