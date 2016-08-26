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

// Run the server
nodemon({
    script: path.resolve(__dirname, 'server', 'app.js'),
    ignore: path.resolve(__dirname, 'client'),
    args: ['dev'],
    env: {
        PORT: port,
        BUILD_PORT: build_port,
        JWT_SECRET: 'test',
    },
});

nodemon.on('start', function() {
    console.log('Server started');
}).on('quit', function() {
    console.log('Server has stopped\n');
    process.exit(0);
}).on('restart', function(files) {
    console.log('Server restarting. File: ', files);
});
