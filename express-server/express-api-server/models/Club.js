var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClubSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
    },
    emailID: {
        type: String,
        required: [true, 'Correct BITSmail ID required'],
        unique: true,
    },

});

//Virtual for club's URL
ClubSchema
.virtual('url')
.get(function () {
    return '/user/club/' + this._id;
});

module.exports = mongoose.model('Club', ClubSchema);
