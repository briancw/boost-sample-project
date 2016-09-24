const path = require('path');

module.exports = {
    context: __dirname,
    entry: [
        './client/main.js',
        './client/styles/_main.scss',
    ],
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'all.min.js',
    },
    module: {
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            }, {
                test: /\.vue$/,
                loader: 'vue',
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
            },
        ],
    },
    plugins: [],
    vue: {
        loaders: {
            js: 'babel',
            scss: 'style!css!sass',
            sass: 'style!css!sass?indentedSyntax',
        },
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
};
