const expressJwt = require('express-jwt');
const { secret } = require('../jwt_secret.json');

module.exports = jwt;

function jwt() {
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            /\/api_docs*/,/\/login/
        ]
    });
}