const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    performance: {
        hints: false
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use :{
                    loader: 'babel-loader',
                },

            },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
            
            
        ]
    },
    devServer: {
        // This is where webpack-dev-server serves your bundle
        // which is created in memory.  In this example it will be:
        //   http://localhost/assets/bundle.js
        //publicPath: '/dist/bundle.js',
        publicPath: "/",
        contentBase: "./dist",
        hot: true
      },
      devtool: 'source-map',
      plugins: [new webpack.SourceMapDevToolPlugin({})],
      mode: 'production'

}