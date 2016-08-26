const webpack = require('webpack');
let config = require('./webpack.config.js');
const build_port = 3006;

config.devtool = '#eval-source-map';
// config.polyfill = 'eventsource-polyfill';

let host = 'http://localhost:' + build_port;
config.output.publicPath = host + '/build/';
config.entry.push('webpack-hot-middleware/client?path=http://localhost:' + build_port + '/__webpack_hmr');

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

module.exports = config;
