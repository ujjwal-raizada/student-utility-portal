var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var studentSchema = new Schema({
    name: {
        first: String,
        last: String,
        required: false,
    },
    username: {
        // username is nothing but email
        type: String,
        //unique: true,
        validate:{
            validator: function(v){
                return /f201\d{5}\@hyderabad\.bits\-pilani.ac.in/.test(v);
            },
            message: props => `${props.value} is not a valid BITSmail ID!`
        },
        required: [true, 'Correct BITSmail ID required'],
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
        required: true,
    },
    sourceSubscription: {
        // contains list of Notice_objectID(s) in hexstrings 
        type: [String],
        default: [],
    },
    starNotice: {
        // contains list of all starred notices.
        type : [String],
        default : [],
    },
});

studentSchema.virtual('fullName')
    .get(function (){
        return this.name.first + " " + this.name.last;
    })

    .set(function(value){
        this.name.first = value.substr(0, value.indexOf(' '));
        this.name.last = value.substr(value.indexOf(' ') + 1);
        
    });

//Virtual for student's URL
studentSchema.virtual('url')
    .get(function () {
        return '/user/student/' + this._id;
    });

studentSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err){
            console.log(err);
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                console.log(err);
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

studentSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            console.log(err);
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Student', studentSchema);
