'use strict';

/* Note: using staging server url, remove .testing() for production
 Using .testing() will overwrite the debug flag with true */
var LEX = require('letsencrypt-express').testing();

var lex = LEX.create({
    configDir: require('os').homedir() + '/letsencrypt/etc',
    approveRegistration: function (hostname, cb) { // leave `null` to disable automatic registration
        // Note: this is the place to check your database to get the user associated with this domain
        cb(null, {
            domains: 'http://ec2-52-90-83-128.compute-1.amazonaws.com/',
            email: 'jeremiah.j.scanlon@gmail.com',
            agreeTos: true
        });
    }
});

module.exports = lex;