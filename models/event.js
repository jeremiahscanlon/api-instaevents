var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Need to add stuff like validation and required, etc...
// Zip with a first number 0 isn't registering properly ... SOLUTION: must be a string.

var EventSchema = new Schema({
    name: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    loc: {
        type: [Number],
        index: '2d'
    },
    location_name: String,
    description: String,
    attendees: {
        invited:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        in:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        out:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        watching:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    date_time: Date,
    tags: Array,
    image: String,
    current: Boolean,
    private: Boolean,
    deleted: Boolean
},{
    timestamps: true
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;