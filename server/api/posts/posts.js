const thinky = require('thinky')();
const type = thinky.type;

const Posts = thinky.createModel('posts', {
    content: type.string().required(),
    username: type.string(),
});

module.exports = Posts;
