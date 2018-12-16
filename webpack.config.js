const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            } 
        ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({template: './index.html'})
    ]
}