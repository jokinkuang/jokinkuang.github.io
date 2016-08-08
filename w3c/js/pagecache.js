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

  pc = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new PageCache.fn.init( selector, context );
	};

  // Functions
  PageCache.fn = PageCache.prototype = {

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
  }
});
