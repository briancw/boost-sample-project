const nodemon = require('nodemon');
const path = require('path');

const webpack = require('webpack');
const webpack_config = require('./webpack.dev.conf.js');
const compiler = webpack(webpack_config);

const express = require('express');
const app = express();

const port = 3005;
const build_port = 3006;

// Webpack and serve built js from a dedicated task (to avoid resets)
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

app.listen(build_port, function(err) {
    if (err) {
        console.log(err);
    }

    console.log('serving build to ' + build_port);
});
