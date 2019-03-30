var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficialSourceSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    username: {
        // username is nothing but email
        type: String,
        required: [true, 'Correct BITSmail ID required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
    },
    subscription:{
        // contains list of Notice_objectID(s) in hexstrings 
        type: [String],
        default: null,
    },
    noticeList:{
        // contains list of all the notices put up by this source
        type: [String],
        default: null,
    },    
});