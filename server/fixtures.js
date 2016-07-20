/* globals co */
const Users = require('./api/users/users.js');
let redb = false;
process.argv.forEach(arg => {
    if (arg === 'redb') {
        redb = true;
    }
});

co(function * () {
    let user_count = Users.count().execute();
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
})();
