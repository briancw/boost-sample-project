/* globals co */
const Users = require('./api/users/users.js');
const Posts = require('./api/posts/posts.js');

const lorem = require('lorem-hipsum');
const lorem_opts = {
    count: 15,
    units: 'words',
    format: 'plain',
};

let redb = false;
process.argv.forEach(arg => {
    if (arg === 'redb') {
        redb = true;
    }
});

// setInterval(function() {
//     let rand = Math.round(Math.round() * 3);
//     if (rand === 0) {
//         Posts.save({
//             content: lorem(lorem_opts),
//             username: ((Math.random() > 0.555) ? 'adam' : 'brian'),
//         });
//     } else if (rand === 1) {
//         Posts.sample(1).run().then(posts => {
//             if (posts.length) {
//                 posts[0].delete();
//             }
//         });
//     } else {
//         Posts.sample(5).run().then(posts => {
//             if (posts.length) {
//                 posts.forEach(post => {
//                     post.merge({
//                         content: lorem(lorem_opts),
//                     }).save();
//                 });
//             }
//         });
//     }
//
//     Posts.count().execute().then(count => {
//         if (count > 60) {
//             console.log('Deleting 20 posts');
//             Posts.sample(20).run().then(posts => {
//                 posts.forEach(post => {
//                     post.delete();
//                 });
//             });
//         }
//     });
// }, 500);

co(function * () {
    let user_count = yield Users.count().execute();
    if (!user_count || redb) {
        console.log('resetting and creating users');
        yield Users.run().each(user => {
            user.delete();
        });

        Users.save({
            email: 'brian@whicheloe.us',
            pwd_hash: '123456',
        });
    }

    let posts_count = yield Posts.count().execute();
    if (!posts_count || redb) {
        console.log('Resetting and creating posts');
        yield Posts.run().each(post => {
            post.delete();
        });

        for (let i = 0; i < 40; i++) {
            Posts.save({
                content: lorem(lorem_opts),
                username: ((Math.random() > 0.555) ? 'adam' : 'brian'),
            });
        }
    }
})();
