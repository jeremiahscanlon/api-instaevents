module.exports = function(app){

    var mongoose 	= require('mongoose');
    var moment = require('moment');

    var User = require('../models/user.js');
    var Event = require('../models/event.js');

    // local dev
    //mongoose.connect('mongodb://localhost/testusers');

    // aws mongo location
    mongoose.connect('mongodb://reactNativeApp:75kAPS3DmMbH@ec2-52-90-83-128.compute-1.amazonaws.com:27017/dummyDB');

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("We're connected!");
    });
};