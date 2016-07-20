const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT ? process.env.PORT : 80;
const path = require('path');
const io = require('socket.io')(server);
GLOBAL.co = require('bluebird').coroutine;

require('./fixtures');
require('./dev_mode.js')(app);
const h = require('./helpers.js');
// const check_auth = require('./auth_check.js');

app.use(require('connect-history-api-fallback')());

const api = new express.Router();

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', api);

// Setup Listeners
const productsChannel = io.of('/products');
productsChannel.on('connection', function(socket) {
    socket.on('verify_data', function() {
        console.log('verify data');
    });
    console.log('new connection');

    socket.on('get_data', function() {
        socket.emit('data_response', 'init_' + Math.random());
        console.log('get data request');
    });
});

setInterval(function() {
    productsChannel.emit('update', 'update_' + Math.random());
}, 2000);

// Load Methods
require('./api/users/users_methods.js')(api);

server.listen(port, function(err) {
    h.handle(err);
    console.log('Listening on port: ' + port);
});
