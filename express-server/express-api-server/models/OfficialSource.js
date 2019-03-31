var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficialSourceSchema = new Schema({
    username: {
        // username is nothing but email
        type: String,
        validate:{
            validator: function(v){
                return /[a-z]*\@hyderabad\.bits\-pilani.ac.in/.test(v);
            },
            message: props => `${props.value} is not a valid BITSmail ID!`
        },
        required: [true, 'Correct BITSmail ID required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
        required: true,
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

module.exports = mongoose.model('OfficialSource', OfficialSourceSchema);
