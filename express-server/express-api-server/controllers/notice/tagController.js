var Tag = require('../../models/Tag');
var async = require('async');

//return list of tags
exports.get_tags = function(req, res) {

    console.log('Returning Tags');
    
    async.parallel({
        'Tag': function(callback) {
            Tag.find()
            .exec(callback);
            console.log('tags fetched')
        },

    
    }, function(err, result) {
        if(err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            return next({...err, res_data});
        }

        tags_list = []
        for (x in result.Tag) {
            tags_list.push(result.Tag[x]['name'])
        }

        console.log(tags_list);
        res.json(tags_list);
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
            res_data['status'] = 'failure';
            return res.json(res_data);
        }
        console.log('Result_tag: ' + result.Tag);
        
        if (result.Tag == null) {
            Tag.create({'name': tag_name}, function(err, instance) {
                if(err) {
                    console.log(err);
                res_data['status'] = err;
                return res.json(res_data);
                }
                else {
                    console.log('Tag created!!!');
                    res_data['status'] = 'tag created!';
                    return res.json(res_data);
                }
            });
        }
        else {
            res_data['status'] = 'tag already exists!';
            return res.json(res_data);
        }

    });
};
