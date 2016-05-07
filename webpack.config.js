var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var fs = require("fs");
var _ = require("lodash");

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        'main': ['webpack-dev-server/client?http://localhost:8080',
                    'webpack/hot/dev-server',
                    './src/entries/main.js']
    },
    output: {
        publicPath: 'http://localhost:8080/assets',
        path: "./dist/js",
        filename: "main.js"
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
                loaders: ['react-hot','babel?presets[]=es2015&presets[]=react'],
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
    plugins: (function () {
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
