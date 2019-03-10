const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    app: ['webpack/hot/dev-server', './javascripts/entry.jsx']
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:8080/dist',
    port: 8080,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
