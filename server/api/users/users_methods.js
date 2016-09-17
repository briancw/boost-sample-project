/* globals co */
const Users = require('./users.js');
const jwt = require('jsonwebtoken');
const process = require('process');
const secret_key = process.env.JWT_SECRET;

module.exports = function(api, boost) {
    api.post('/login', co(function * (req, res) {
        let return_val = {success: false};
        let email = req.body.email;
        let pwd = req.body.pwd;

        if (!email) {
            return_val.error = 'Missing required email';
        } else if (!pwd) {
            return_val.error = 'Missing required password';
        } else {
            yield Users.filter({email: email}).run().then(users => {
                let tmp_user = users[0];

                if (!tmp_user || pwd !== tmp_user.pwd_hash) {
                    return_val.error = 'Inavlid username or password';
                } else {

                    // authStatus can be anything,
                    // it will be encoded into the jwt
                    // and attached to all api req objects.
                    //
                    // invalidationDate is used by the frontend
                    // to help determine wether or not a user
                    // should be able to transition to a new page.
                    // (see auth.vue)
                    // The version in localStorage is never used for
                    // server auth of any kind.

                    let authStatus = true;
                    // Max, this is where I would like to remove token logic and make it part of boost.login() using websockets
                    // Does this all make sense?
                    let tokenInfo = boost.getLoginToken(tmp_user, authStatus);
                    return_val.token = tokenInfo.token;
                    return_val.invalidationDate= tokenInfo.invalidationDate;

                    return_val.success = true;
                }
            });
        }

        res.send(return_val);
    }));

    // This functions hasn't been updated to new auth method.
    // Dunno if we want to login the user after registering -js
    api.post('/register', co(function * (req, res) {
        let return_val = {success: false};
        let email = req.body.email;
        let pwd = req.body.pwd;

        if (!email) {
            return_val.error = 'Missing required email';
        } else if (!pwd) {
            return_val.error = 'Missing required password';
        } else {
            let existing_users = yield Users.filter({email: email}).run();

            if (existing_users && existing_users.length) {
                return_val.error = 'This email has already been registered';
            } else {
                let pwd_hash = req.body.pwd;
                let new_user = yield Users.save({email: email, pwd_hash: pwd_hash});
                console.log(new_user);
                return_val.success = true;
            }
        }

        res.send(return_val);
    }));

    api.post('/logout', function(req, res) {
        boost.logoutToken(req.body.token);
        let return_val = {
            success: true,
            // Send null token for frontend
            // If a token is too old the frontend will not render authed pages
            // however, when a manual logout is done the token should be unset for proper user flow.
            token: null,
        };
        res.send(return_val);
    });

    api.post('/test', function(req, res) {
        res.send({authStatus: req.authStatus});
    });
};
