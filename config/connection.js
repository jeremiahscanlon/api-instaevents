module.exports = function(app){
    // require mongoose
    var mongoose 	= require('mongoose');
    var User = require('../models/user.js');

    mongoose.connect('mongodb://reactNativeApp:75kAPS3DmMbH@ec2-52-90-83-128.compute-1.amazonaws.com:27017/dummyDB');

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log("We're connected!");

        var smiller = new User({
            username: 'smiller5',
            password: 'password',
            email: 'smiller@gmail.com',
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

        smiller.save(function (err, smiller) {
            if (err) return console.error(err);
            console.log(smiller)
        });
    });
};