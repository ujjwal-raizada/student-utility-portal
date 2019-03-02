var mongoose = require('mongoose')
var timestamp = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var noticeSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

noticeSchema.plugin(timestamp);

var Notice = mongoose.model('Notice', noticeSchema);
modules.export = Faculty;
