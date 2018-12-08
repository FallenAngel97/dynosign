var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: ['webpack/hot/dev-server', './javascripts/entry.js'],
    },
    output: {
        path: __dirname + 'dist',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/dist'
    },
    devServer: {
        contentBase: './',
        publicPath: 'http://localhost:8080/dist',
        port:8080,
        hot:true
    },
    module: {
        rules: [
            {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
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
                "babel-loader"
            ]
        }]
    },
    target: 'electron-renderer',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
