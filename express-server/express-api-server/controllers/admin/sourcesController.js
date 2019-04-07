var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

var view_sources = function(req, res, next){
    console.log('Returning all the sources');
    var res_data = {
        'status' : '',
        'message' : '',
        'source_list' : [],
    }
    async.parallel({
        'Source' : function (callback){
            OfficialSource.find()
            .exec(callback);
            console.log('Fetching Sources ... ');
        },

    },  
    function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            return res.json(res_data);
        }
        for (x in result.Source){
            res_data.source_list.push(result.Source[x]);
        }
        res_data['status'] = 'success';
        res_data['message'] = 'Fetched Sources';
        console.log(res_data.source_list);
        return res.json(res_data);
    });
};

module.exports = view_sources;
