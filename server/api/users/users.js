const thinky = require('thinky')();
const type = thinky.type;

const Users = thinky.createModel('users', {
    email: type.string().required(),
    pwd_hash: type.string().required(),
});

module.exports = Users;
