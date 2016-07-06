// require mongoose
var mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost/testusers');
var Schema = mongoose.Schema;

// Need to add stuff like validation and required, etc...
// Zip with a first number 0 isn't registering properly
var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    email: String,
    picture: String,
    bio: String,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    age: Number,
    homezip: Number,
    workzip: Number,
    settings: {
        notifications: Boolean,
    }
});

var User = mongoose.model('User', userSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("We're connected!");

    var kevin = new User({
        username: 'KJG310',
        password: 'password',
        email: 'KJG310@Gmail.com',
        picture: 'http://www.digitaljournal.com/img/5/9/2/8/1/2/i/1/2/6/o/tard3.JPG',
        bio: 'I love playing all sorts of sports and video games!',
        // friends: [{
        //    	type: Schema.Types.ObjectId,
        //    	ref: 'User'
        //    }],
        age: 27,
        homezip: 07920,
        workzip: 07920,
        settings: {
            notifications: true,
        }
    });

    kevin.save(function (err, kevin) {
        if (err) return console.error(err);
    });

    console.log(kevin)

});

// export the connection variable for accessing mysql database info
module.exports = mongoose;