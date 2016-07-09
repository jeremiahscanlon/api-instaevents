var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Need to add stuff like validation and required, etc...
// Zip with a first number 0 isn't registering properly ... SOLUTION: must be a string.

var UserSchema = new Schema({
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
    homezip: String,
    workzip: String,
    settings: {
        notifications: Boolean,
    }
},{
    timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;