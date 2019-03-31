var Tag = require('../../models/Tag');
var async = require('async');

//return list of tags
exports.get_tags = function(req, res) {

    console.log('Returning Tags');
    
    async.parallel({
        'Tag': function(callback) {
            Tag.find()
            .exec(callback);
        },

    
    }, function(err, result) {
        if(err) throw err;
        res_data = {}

        console.log(result.Tag);
        res.json(res_data);
    });
};

exports.create_tags = function(req, res) {

    tag_name = req.body.tag_name;
    console.log('Creating Tags');

    res_data = {'tag_name': tag_name}
    
    async.parallel({
        'Tag': function(callback) {
            Tag.findOne({'name': tag_name})
            .exec(callback);
        },

    
    }, function(err, result) {
        if(err) {
            console.log(err);
            res_data['status'] = err;
            res.json(res_data);
        }
        console.log('Result_tag: ' + result.Tag);
        
        if (result.Tag == null) {
            Tag.create({'name': tag_name}, function(err, instance) {
                if(err) {
                    console.log(err);
                res_data['status'] = err;
                res.json(res_data);
                }
                else {
                    console.log('Tag created!!!');
                    res_data['status'] = 'tag created!';
                    res.json(res_data);
                }
            });
        }
        else {
            res_data['status'] = 'tag already exists!';
            res.json(res_data);
        }

    });
};
