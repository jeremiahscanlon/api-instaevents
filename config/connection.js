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

        var kevin = new User({
            username: 'kgraber',
            password: 'password',
            email: 'kevin@gmail.com',
            picture: 'http://www.digitaljournal.com/img/5/9/2/8/1/2/i/1/2/6/o/tard3.JPG',
            bio: 'I love playing all sorts of sports and video games!',
            // friends: [{
            //    	type: Schema.Types.ObjectId,
            //    	ref: 'User'
            //    }],
            age: 35,
            homezip: '10012',
            workzip: '08856',
            settings: {
                notifications: true,
            }
        });

        kevin.save(function (err, kevin) {
            if (err) return console.error(err);
            console.log(kevin);
        });

        var date = moment("2016-08-01 4:30", "YYYY-MM-DD HH:mm");

        var event = new Event({
            name: 'The First Event',
            // creator: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // },
            loc: [40.4995488, -74.4443186],
            location_name: 'Rutgers University',
            description: 'It had to start somewhere, so this is where.',
            // attendees: [{
            //     invited:[{
            //         type: Schema.Types.ObjectId,
            //         ref: 'User'
            //     }],
            //     in:[{
            //         type: Schema.Types.ObjectId,
            //         ref: 'User'
            //     }],
            //     out:[{
            //         type: Schema.Types.ObjectId,
            //         ref: 'User'
            //     }],
            //     watching:[{
            //         type: Schema.Types.ObjectId,
            //         ref: 'User'
            //     }]
            // }],
            date_time: date,
            tags: ['school', 'fun',''],
            image: 'http://www.dayawaycareers.com/files/Post-Grad--Rutgers-University/Rutgers%20building%20edited.jpg',
            current: true,
            private: false
        });

        event.save(function (err, event) {
            if (err) return console.error(err);
            console.log(event);
        });
        
    });
};