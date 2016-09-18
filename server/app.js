const BoostServer = require('boostjs-server');
const boostConfig = require('./boost_config');
const boost = new BoostServer(boostConfig);

const express = require('express');
const path = require('path');
const port = process.env.PORT ? process.env.PORT : 80;
global.co = require('bluebird').coroutine;
const app = boost.app;

require('./fixtures');
require('./dev_mode.js')(app);
// const check_auth = require('./auth_check.js');

const api = new express.Router();
app.use('/api', api);
app.use('/', express.static(path.join(__dirname, '../public')));

// Load Methods
require('./api/users/users_methods.js')(boost, api);
require('./api/posts/posts_endpoint.js')(boost);

boost.launch(port, err => {
    if (err) {
        console.log(err);
    }
    console.log('Listening on port: ' + port);
});