/// <binding />
"use strict";
function isProduction() {
    return false;
}
var webpack = require('webpack'),
    BowerWebpackPlugin = require("bower-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path');

let extractCSS = new ExtractTextPlugin('[name].css');
let extractLESS = new ExtractTextPlugin('css/out/bundle.less.css'); // path where bundle will be saved

module.exports = {
    entry: './wwwroot/index.js',
    output: {
        path: "./wwwroot/",
        filename: "bundle.js"
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        //extensions: ['', '.js', '.scss'],
        alias: {
            //SockJS: path.resolve("./wwwroot/lib/sockjs.min.js")
            moment: path.resolve('./wwwroot/lib/moment/moment-with-locales.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            JQuery: "jquery",
            _: "underscore",
            moment: "moment"
        }),
        //extractCSS,
        extractLESS,
        //new webpack.optimize.DedupePlugin()
        //isProduction()? new webpack.optimize.UglifyJsPlugin(): function() {}
        // ,new ExtractTextPlugin('bundle.css')
    ],
    //devServer: {
    //    contentBase: "/",
    //    host: "localhost",
    //    port: 9000
    //},
    //debug: isProduction()? false: true,
    module: {
        loaders: [
            //{test: /\.scss$/i, loader: extractCSS.extract(['css-loader', 'sass-loader'])},
            {test: /\.less$/i, loader: extractLESS.extract(['css-loader', 'less-loader'])},
            //{
            //    test: /\.scss$/,
            //    loader: ExtractTextPlugin.extract('style', 'css!sass')
            //    //loaders: ["style-loader", "css-loader", "sass-loader"]
            //},
            /* {
             test: /\.scss$/,
             // loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + sassPaths
             loader: ExtractTextPlugin.extract('style', 'css!sass')
             // include: sassPaths
             },*/
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
            {test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css"},
            {test: /\.useable\.css$/, loader: "style/useable!css"}
            //{
            //    test: /\.png$/,
            //    loader: "url-loader?limit=100000"
            //},
            //{
            //    test: /\.jpg$/,
            //    loader: "file-loader"
            //},
            //{
            //    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            //    loader: 'url?limit=10000&mimetype=application/font-woff'
            //},
            //{
            //    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            //    loader: 'url?limit=10000&mimetype=application/octet-stream'
            //},
            //{
            //    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            //    loader: 'file'
            //},
            //{
            //    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //    loader: 'url?limit=10000&mimetype=image/svg+xml'
            //}
        ]
    },
    devtool: 'eval-source-maps'
};
