/// <binding />
"use strict";
var webpack = require('webpack'),
    BowerWebpackPlugin = require("bower-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './wwwroot/index.js' ,
    output: {
        path: "./wwwroot/",
       
        filename: "bundle.js"
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
                    new webpack.ProvidePlugin({
                        $: "jquery",
                        jQuery: "jquery",
                        JQuery: "jquery",
                        _: "underscore",
                        moment:"moment"
                        //'window.Tether': "tether",
                        //'Tether': "tether"
                    })
                   // ,new ExtractTextPlugin('bundle.css')
                ],
    devServer: {
        contentBase: "/",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.html$/,
                loader: "underscore-template-loader",
                query: {
                    interpolate: '\\{\\{=(.+?)\\}\\}',
                    escape: '\\{\\{-(.+?)\\}\\}',
                    evaluate: '\\{\\{(.+?)\\}\\}'
                    //evaluate: /{{([\s\S]+?)}}/g,
                    //interpolate: /{{=([\s\S]+?)}}/g,
                    //escape: /{{-([\s\S]+?)}}/g
                }
            },
            {
                test: /\.scss$/,
                loaders: ["sass","style", "css" ]
            },
            //{
            //    test: /\.css$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            //},
            { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
            { test: /\.useable\.css$/, loader: "style/useable!css" },
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
