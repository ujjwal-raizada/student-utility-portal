var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
    },
    category: {
        type: String,
        required: true,
        default: "Student",
        validate: {
// Admin, Administration, Faculty, Club Head, Student => allowed categories
            validator: function (value) {
                // Add a function to check the default values.
            },
        },
    },
    emailID: {
        type: String,
        required: [true, 'BITSmail ID required'],
        validate:{
            validator: function (v) {
                // Add a method to check a working bits-mail
            },
        },
        unique: true,
    },
    isAdmin: {
        type:  Boolean,
        default: false,
    },
});


userSchema.virtual('fullName').
    get(function (){
    return this.name.first + " " + this.name.last;}).

    set(function(value){
        this.name.first = value.substr(0, value.indexOf(' '));
        this.name.last = value.substr(value.indexOf(' ') + 1);
        
    });


var User = mongoose.model('User', userSchema);