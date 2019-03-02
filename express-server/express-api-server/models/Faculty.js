var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facultySchema = new Schema({
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

facultySchema.virtual('fullName').
    get(function (){
    return this.name.first + " " + this.name.last;}).

    set(function(value){
        this.name.first = value.substr(0, value.indexOf(' '));
        this.name.last = value.substr(value.indexOf(' ') + 1);
        
    });

//Virtual for faculty's URL
facultySchema
.virtual('url')
.get(function () {
    return '/user/faculty/' + this._id;
});

module.exports = mongoose.model("Faculty", facultySchema);
