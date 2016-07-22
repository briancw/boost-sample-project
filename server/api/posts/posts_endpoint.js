const hash = require('object-hash');

module.exports = function(io) {
    const Posts = require('./posts.js');
    const postsSubscription = io.of('/posts');

    postsSubscription.on('connection', function(socket) {
        console.log('new connection');

        socket.on('verify_data', data_hash => {
            console.log('verify data request ' + data_hash);

            let current_hash;
            Posts.run().then(posts => {
                current_hash = hash(JSON.stringify(posts));
                console.log('Current Data Hash: ' + current_hash);
            });

            let is_valid = (data_hash === current_hash);
            socket.emit('verify_response', {valid: is_valid});
        });

        socket.on('get_data', function() {
            console.log('get data request');

            Posts.run().then(posts => {
                let current_hash = hash(posts);
                socket.emit('data_response', {data: posts, hash: current_hash});
            });
        });
    });

    Posts.changes().then(function(changes) {
        changes.each(function(error, doc) {
            if (error) {
                console.log(error);
            }

            let change_type;
            if (doc.isSaved() === false) {
                console.log('document deleted');
                change_type = 'delete';
            } else if (doc.getOldValue() === null) {
                console.log('new document');
                change_type = 'insert';
            } else {
                console.log('document update');
                change_type = 'update';
            }

            console.log(doc);
            postsSubscription.emit('update', change_type);
        });
    }).error(function(error) {
        console.log(error);
    });
};
