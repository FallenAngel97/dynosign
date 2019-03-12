const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }]
  },
  target: 'electron-renderer',
  // Need to implement this somehow :(
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
