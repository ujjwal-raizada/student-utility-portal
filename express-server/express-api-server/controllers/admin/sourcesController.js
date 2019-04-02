var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

var view_sources = function(req, res){
    console.log('Returning all the sources');

    async.parallel({
        'Source' : function (callback){
            OfficialSource.find()
            .exec(callback);
            console.log('Sources fetched');
        },

    },  function(err, result){
        if (err) throw err;

        source_list = [];

        for (x in result.Source){
            source_list.push(result.Source[x]);
        }

        console.log(source_list);
        res.json(source_list);
    });
};

module.exports = view_sources;
