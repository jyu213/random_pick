'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');

const port = 8080;

for (let entry in config.entry) {
    config.entry[entry].unshift(
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/dev-server'
    );
}

let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});

server.listen(port);
