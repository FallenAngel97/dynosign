const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: 'dist/'
  },
  entry: {
    app: ['./javascripts/entry.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html'
    })
  ]
});
