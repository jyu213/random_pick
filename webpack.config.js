'use strict';

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const fs = require("fs");
const mergeWith = require('lodash/mergeWith');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        'main': ['webpack-dev-server/client?http://localhost:8080/',
                'webpack/hot/dev-server',
                './src/entries/main.js']
    },
    output: {
        publicPath: 'http://localhost:8080/assets',
        path: "./dist/js",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot','babel?presets[]=es2015&presets[]=react&plugins[]=babel-plugin-transform-object-rest-spread'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
        extensions: ['', '.js', '.jsx', '.css'],
        alias: {
        }
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    plugins: (() => {
        return isDev ? [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('dev')
                }
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                },
                comments: false
            }),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        ];
        })()
};
