const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: 'dist/'
  },
  entry: {
    app: ['./javascripts/entry.jsx']
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html'
    }),
    new OptimizeCSSAssetsPlugin({})
    // new PrepackWebpackPlugin({
    //   mathRandomSeed: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // optimization: {
  //   minimizer: [
  //     new ClosurePlugin({ mode: 'STANDARD' }, {})
  //   ]
  // }
});
