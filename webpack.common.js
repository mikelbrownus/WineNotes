const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
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
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
              template: './index.html',
              baseUrl: process.env.NODE_ENV == 'development' ? '/' : 'https://mikelbrownus.github.io/WineNotes/'
      }),
      new CopyWebpackPlugin([
        { from: 'icons', to: 'icons'},
        {from: 'manifest'}
      ]),
      new WorkboxPlugin.GenerateSW({
          clientsClaim: false, 
          skipWaiting: false,
          runtimeCaching: [
            {
                urlPattern: /icons/,
                handler: 'CacheFirst'
            },
            {
                urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'google-fonts-stylesheets'
                }
            },
            {
                urlPattern: /.*/,
                handler: 'NetworkFirst'
            },
            {
                urlPattern: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'external-images',
                    expiration: {
                        maxEntries: 200,
                        maxAgeSeconds: 60 * 60 * 24 * 14//2 weeks
                      },
                }
            }
        ]
        })
    ]
}