var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩打包文件

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
