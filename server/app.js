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
let Posts = require('./api/posts/posts.js');

const postsSubscription = io.of('/posts');
postsSubscription.on('connection', function(socket) {
    console.log('new connection');

    socket.on('verify_data', function() {
        console.log('verify data request');
    });

    socket.on('get_data', function() {
        console.log('get data request');

        Posts.run().then(posts => {
            console.log(posts);
            socket.emit('data_response', posts);
        });
    });
});

Posts.changes().then(function(feed) {
    feed.each(function(error, doc) {
        if (error) {
            console.log(error);
        }

        console.log("A document was updated.");
        console.log("New value:");
        console.log(JSON.stringify(doc));
        postsSubscription.emit('update', doc);
    });
}).error(function(error) {
    console.log(error);
});

// setInterval(function() {
//     Posts.run().each(post => {
//         let rand = String(Math.random());
//         post.merge({content: 'content ' + rand}).save();
//     });
// }, 3000);

// Load Methods
require('./api/users/users_methods.js')(api);

server.listen(port, function(err) {
    h.handle(err);
    console.log('Listening on port: ' + port);
});
