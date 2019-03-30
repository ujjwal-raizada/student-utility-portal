var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var adminSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: [ 6, 'Password should contain atleast 6 characters'],
        maxlength: [20, 'Password can contain a maximum of 20 characters'],
    },
});

//Virtual for admin's URL
adminSchema.virtual('url')
    .get(function () {
        return '/user/admin/' + this._id;
    });

module.exports = mongoose.model('Admin', adminSchema);
