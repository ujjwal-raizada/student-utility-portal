var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

var view_sources = function(req, res){
    var res_data = {};
    OfficialSource.find({}, function(err, result){
        if (err) next(err);

        res_data = result;
        for (var i = 0; i < res_data.length; i++) 
            res_data[i].password = '';
        console.log(`List of students registered to our portal ${res_data}`);
    });
    res.json(res_data);
};

module.exports = view_sources;
