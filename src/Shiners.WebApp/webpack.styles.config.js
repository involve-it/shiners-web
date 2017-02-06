/// <binding />
"use strict";
var webpack = require('webpack'),
    BowerWebpackPlugin = require("bower-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path=require('path');

module.exports = {
    entry: './wwwroot/style.js',
    output: {
        path: "./wwwroot/build/",
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: ["/wwwroot/lib"],
            manifestFiles:      "bower.json",
            includes:           /.*/,
            excludes:           [],
            searchResolveModulesDirectories: true
        }),
        new ExtractTextPlugin("site.css")
    ],
    //devServer: {
    //    contentBase: "/",
    //    host: "localhost",
    //    port: 9000
    //},
    module: {
        loaders: [
            
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            //{
            //    test: /\.scss$/,
            //    loaders: ["sass","style", "css" ]
            //},
           // { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },

            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};
