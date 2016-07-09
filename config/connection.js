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

        var fattony = new User({
            username: 'fattony',
            password: 'password',
            email: 'fattony@gmail.com',
            picture: 'http://www.digitaljournal.com/img/5/9/2/8/1/2/i/1/2/6/o/tard3.JPG',
            bio: 'I\'m the fattest of all the Tonys',
            // friends: [{
            //    	type: Schema.Types.ObjectId,
            //    	ref: 'User'
            //    }],
            age: 25,
            homezip: '01007',
            workzip: '01568',
            settings: {
                notifications: true
            }
        });

        fattony.save(function (err, fattony) {
            if (err) return console.error(err);
            console.log(fattony);
        });

        var date = moment("2016-07-27 14:30", "YYYY-MM-DD HH:mm");

        var event = new Event({
            name: 'Beach Volleyball',
            // creator: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // },
            loc: [39.366209, -74.418034],
            location_name: 'Revel AC',
            description: 'Meet us on the beach.',
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
            tags: ['sports', 'fun','volleyball'],
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