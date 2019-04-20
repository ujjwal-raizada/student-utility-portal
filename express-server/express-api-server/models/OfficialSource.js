var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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
    sourceSubscription:{
        // contains list of all the sources subscribed by this source
        type: [String],
        default: null,
    },
    starNotice: {
        // contains list of all the starred notice
        type: [String],
        default: null,
    },
    noticeList:{
        // contains list of all the notices put up by this source
        type: [String],
        default: null,
    },    
});

//Virtual for student's URL
OfficialSourceSchema.virtual('url')
    .get(function () {
        return '/user/officialsource/' + this._id;
    });

OfficialSourceSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

OfficialSourceSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('OfficialSource', OfficialSourceSchema);
