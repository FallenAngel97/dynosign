const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');

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
  ],
  optimization: {
    minimizer: [
      new ClosurePlugin({ mode: 'STANDARD' }, {
        // compiler flags here
        //
        // for debuging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true,
        // renaming: false
      })
    ]
  }
});
