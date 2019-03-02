var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {
        first: String,
        last: String,
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

studentSchema.virtual('fullName').
    get(function (){
    return this.name.first + " " + this.name.last;}).

    set(function(value){
        this.name.first = value.substr(0, value.indexOf(' '));
        this.name.last = value.substr(value.indexOf(' ') + 1);
        
    });


//Virtual for student's URL
studentSchema
.virtual('url')
.get(function () {
    return '/user/student/' + this._id;
});

module.exports = mongoose.model('Student', studentSchema);
