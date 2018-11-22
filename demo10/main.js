
//require.ensure告诉Webpack ./a.js应该将其分离bundle.js并构建到单个块文件中。
require.ensure(['./a'], function(require) {
  var content = require('./a');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});
