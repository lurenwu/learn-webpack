var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js',
    bundle3: './main3.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    })
  ]
};
