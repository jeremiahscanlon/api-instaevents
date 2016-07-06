var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    link: {
        type:String,
        required:true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

var Page = mongoose.model('Page', PageSchema);
module.exports = Page;