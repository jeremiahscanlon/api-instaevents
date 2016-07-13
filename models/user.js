var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Need to add stuff like validation and required, etc...
// Zip with a first number 0 isn't registering properly ... SOLUTION: must be a string.

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name:{
        first:String,
        last:String
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    picture: String,
    bio: String,
    friends: {
        requested:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        accepted:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        removed:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    age: Number,
    homezip: String,
    workzip: String,
    settings: {
        notifications: Boolean
    },
    events: {
        invited:[{
            type: Schema.Types.ObjectId,
            ref: 'Events'
        }],
        in:[{
            type: Schema.Types.ObjectId,
            ref: 'Events'
        }],
        out:[{
            type: Schema.Types.ObjectId,
            ref: 'Events'
        }],
        watching:[{
            type: Schema.Types.ObjectId,
            ref: 'Events'
        }],
        past:{
            invited:[{
                type: Schema.Types.ObjectId,
                ref: 'Events'
            }],
            in:[{
                type: Schema.Types.ObjectId,
                ref: 'Events'
            }],
            out:[{
                type: Schema.Types.ObjectId,
                ref: 'Events'
            }],
            watching:[{
                type: Schema.Types.ObjectId,
                ref: 'Events'
            }]
        }
    },
    deleted: Boolean
},{
    timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;