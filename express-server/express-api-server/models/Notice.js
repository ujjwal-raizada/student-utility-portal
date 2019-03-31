var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var noticeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String, 
        required: false,
        default: null,
    },
    tags: {
        type: [String],
        required: false,
    },
    source:{
        type: String,
        required: true,
    },
    isEvent: {
        type: Boolean,
        default: false,
        required: true,
    },

    eventDateTime: {
        type: Date,
        default: null,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
});


//Virtual for notice's URL
noticeSchema.virtual('url')
    .get(function () {
        return '/notice/id/' + this._id;
    });

module.exports = mongoose.model('Notice', noticeSchema);
