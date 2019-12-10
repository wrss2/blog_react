const path = require('path');  
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
require('babel-register');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve('dist'),
        filename: 'bundled.js'
    },   
    module:{
        rules:[
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],               
            },
            {
               test: /\.s[ac]ss$/i,
               use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                },
                { loader: 'sass-loader' }
              ]

            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            }
        ],
    },
    optimization: {
        minimizer: [
             new UglifyJsPlugin()
        ],        
        splitChunks: {
            maxSize:500000,
            chunks: 'all'
          }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FaviconsWebpackPlugin({logo:'./src/assets/favicon.png', inject: true}),
         new HtmlWebpackPlugin({
             template: './src/index.html',
             hash: true,
             title: 'Landingi Blog Test',
             content:'Landingi Blog Test',
             filename: './index.html',
         }),
        new WorkboxPlugin.GenerateSW({
                swDest: 'serviceWorker.js',
                clientsClaim: true,
                skipWaiting: true,
        }),     
        new CopyWebpackPlugin([
            {
              from: 'src/serviceWorker.js',
              to: 'serviceWorker.js',
              toType: 'file',
            },
          ]),          
        new CopyWebpackPlugin([
            {
              from: 'src/assets/manifest.json',
              to: 'manifest.json',
              toType: 'file',
            },
          ]),    
        new CopyWebpackPlugin([
            {
                from: 'src/assets/robots.txt',
                to: 'robots.txt',
                toType: 'file',
            },
        ]),
    ],
    devtool:'cheap-module-source-map',
    devServer: {
        hot: true
    }
};





