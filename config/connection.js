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

        var userObject = {
            username: 'kporzee',
            name:{
                first:'Kristaps',
                last:'Porzingis'
            },
            password: 'password',
            email: 'kporzee@gmail.com',
            picture: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3102531.png&w=350&h=254',
            bio: 'Just call me Slimzingis',
            // friends: [{
            //    	type: Schema.Types.ObjectId,
            //    	ref: 'User'
            //    }],
            age: 25,
            homezip: '10012',
            workzip: '08805',
            settings: {
                notifications: true
            }
        };

        var kporzee = new User(userObject);

        kporzee.save(function (err, kporzee) {
            if (err) return console.error(err);
            console.log(kporzee);
        });

        var date = moment("2016-08-13 19:00", "YYYY-MM-DD HH:mm");

        var eventObject = {
            name: 'Red Bulls Game',
            // creator: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // },
            loc: [40.737473, -74.150467],
            location_name: 'Red Bull Arena',
            description: 'They are playing the Montreal Impact',
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
            tags: ['games', 'soccer','tickets'],
            image: 'https://lh4.googleusercontent.com/-U8ytToS05X0/AAAAAAAAAAI/AAAAAAAAZEo/XXanIcoFHBE/s0-c-k-no-ns/photo.jpg',
            current: true,
            private: true
        };

        var event = new Event(eventObject);

        event.save(function (err, event) {
            if (err) return console.error(err);
            console.log(event);
        });
        
    });
};