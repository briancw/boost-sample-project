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

// setInterval(function() {
//     Posts.run().each(post => {
//         let rand = String(Math.random());
//         post.merge({content: 'content ' + rand}).save();
//     });
// }, 3000);

// Load Methods
require('./api/users/users_methods.js')(api);
require('./api/posts/posts_endpoint.js')(io);

server.listen(port, function(err) {
    h.handle(err);
    console.log('Listening on port: ' + port);
});
