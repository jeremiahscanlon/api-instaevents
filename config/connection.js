module.exports = function(app){
    // require mongoose
    var mongoose 	= require('mongoose');
    var User = require('../models/user.js');

    mongoose.connect('mongodb://localhost/testusers');

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("We're connected!");

        var nate = new User({
            username: 'nate123',
            password: 'password',
            email: 'nate@gmail.com',
            picture: 'http://www.digitaljournal.com/img/5/9/2/8/1/2/i/1/2/6/o/tard3.JPG',
            bio: 'I love playing all sorts of sports and video games!',
            // friends: [{
            //    	type: Schema.Types.ObjectId,
            //    	ref: 'User'
            //    }],
            age: 35,
            homezip: '08805',
            workzip: '07960',
            settings: {
                notifications: true,
            }
        });

        nate.save(function (err, nate) {
            if (err) return console.error(err);
        });

        console.log(nate)

    });
};