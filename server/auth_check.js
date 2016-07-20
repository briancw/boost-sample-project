const jwt = require('jsonwebtoken');
const process = require('process');
const secret_key = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    // var token = req.headers['x-access-token'];
    if (!req.body || !req.body.token) {
        res.status(401);
        res.send('Not Authorized');
        return false;
    }

    let token = req.body.token;
    jwt.verify(token, secret_key, function(err, decoded) {
        if (err) {
            console.log('Not Authorized');
            res.status('401');
        } else {
            console.log(decoded);
            req.user_id = decoded.user_id;
            next();
        }
    });
};
