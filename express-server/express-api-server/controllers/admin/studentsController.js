var Student = require('../../models/Student');
var async = require('async');

var view_students = function(req, res){
    console.log('Returning all the sources');

    async.parallel({
        'Student' : function (callback){
            Student.find()
            .exec(callback);
            console.log('Students fetched');
        },

    },  function(err, result){
        if (err) throw err;

        student_list = [];

        for (x in result.Student){
            student_list.push(result.Student[x]);
        }

        console.log(student_list);
        res.json(student_list);
    });
};
module.exports = view_students;
