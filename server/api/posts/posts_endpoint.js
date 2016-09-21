module.exports = function(boost) {
    const Posts = require('./posts.js');

    // boost.publish('/posts', Posts, {username: 'brian'});
    boost.publish('/test', 'server/test.json', null);
};
