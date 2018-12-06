
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      return require('./index.js');
    })({'./index.js': function (require, module, exports) { "use strict";

var result = require("./test.js");
//const s = require("");
result(); },'./test.js': function (require, module, exports) { "use strict";

var result = function result() {
  console.log("Chenlin webpack");
};
module.exports = result; },})
  