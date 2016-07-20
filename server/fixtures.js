/* globals co */
const Users = require('./api/users/users.js');
const Posts = require('./api/posts/posts.js');

let redb = false;
process.argv.forEach(arg => {
    if (arg === 'redb') {
        redb = true;
    }
});

co(function * () {
    let user_count = yield Users.count().execute();
    if (!user_count || redb) {
        console.log('resetting and creating users');
        yield Users.run().each(user => {
            user.delete();
        });

        Users.save({
            email: 'brian@snapshot.is',
            pwd_hash: '123456',
        });
    }

    let posts_count = yield Posts.count().execute();
    if (!posts_count || redb) {
        console.log('Resetting and creating posts');
        yield Posts.run().each(post => {
            post.delete();
        });

        Posts.save({
            content: 'test content',
        });
    }
})();
