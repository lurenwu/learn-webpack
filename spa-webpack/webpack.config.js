const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const glob = require('glob');
const path = require('path');
const PurifyCSSPlugin = require('purifycss-webpack'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge');
const _mode = argv.mode || 'development'
const _modeFlag = _mode === 'production' ? true : false;

const _mergeConfig = require(`./config/webpack.${_mode}.js`)
webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          // 'style-loader'
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
          // loader:'css-loader?modules&localIdentName=[name]-[local]_[hash:base64:5]'
          loader:'css-loader?modules&localIdentName=[local]'

        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new WebpackDeepScopeAnalysisPlugin(),
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, './dist/*.html')),
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: _modeFlag ? "style/[name][hash:5].css" : "style/[name].css",
      chunkFilename:  _modeFlag ? "style/[id][hash:5].css" : "style/[id].css"
    })

  ]
}
module.exports = merge(_mergeConfig,webpackConfig)