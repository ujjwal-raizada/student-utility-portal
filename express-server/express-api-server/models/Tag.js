var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Tag', tagSchema);
