var Student = require('../../models/Student');
var async = require('async');

var view_students = function(req, res, next){
    var res_data = {
        'status' : '',
        'message' : '',
        'student_list' : [],
    }
    console.log('Returning all the sources');

    async.parallel({
        'Student' : function (callback){
            Student.find()
            .exec(callback);
            console.log('Fetching Students ... ');
        },

    },  function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            return res.json(res_data);
        }

        for (x in result.Student){
            res_data.student_list.push(result.Student[x]);
        }
        res_data['status'] = 'success';
        res_data['message'] = 'Fetched Students';
        console.log(res_data.student_list);
        return res.json(res_data);
    });
};

module.exports = view_students;
