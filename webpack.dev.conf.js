const webpack = require('webpack');
let config = require('./webpack.config.js');

config.devtool = '#eval-source-map';
// config.polyfill = 'eventsource-polyfill';

let host = 'http://localhost:8090';
config.output.publicPath = host + '/build/';
config.entry.push('webpack-hot-middleware/client?path=http://localhost:8090/__webpack_hmr');

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

module.exports = config;
