const webpack = require('webpack');
const webpack_config = require('./webpack.dev.conf.js');
const compiler = webpack(webpack_config);
const express = require('express');
const app = express();
// const path = require('path');

app.use(require("webpack-dev-middleware")(compiler, {
    // noInfo: true,
    // stats: {colors: true},
    quiet: true,
    publicPath: webpack_config.output.publicPath,
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

// compiler.plugin('compile', function() {
// });
// compiler.plugin('done', function() {
// });

app.listen(8090);
