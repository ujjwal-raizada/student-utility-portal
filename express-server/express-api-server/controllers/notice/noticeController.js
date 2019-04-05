var Notice = require('../../models/Notice');
var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');
var mongoose = require('mongoose')

// GET endpoint
exports.get_all_notices = function(req, res) {

    console.log('Fetching Notices...');
    
    async.parallel({
        'Notice': function(callback) {
            Notice.find()
            .exec(callback);
        },

    
    }, function(err, result) {


        if(err) {
            console.log(err)
            res.json({'status': 'failure'})
            return            
        }

        /* Notice JSON Structure

        [
            [timestamp, {Notice(1)}],
            [timestamp, {Notice(2)}],
            .
            .
            .
            [timestamp, {Notice(n)}]
        ]

        */

        let notice_data = []

        for (x in result.Notice) {

            let notice = [result.Notice[x].timestamp, result.Notice[x]]
            notice_data.push(notice) 
        }

        // Sorting in desc. order of timestamp
        notice_data.sort(function(a, b) {return b[0] - a[0]})
        
        console.log(notice_data)
        res.json(notice_data)

    });
}

exports.create_notice = function(req, res) {

    title = req.body.title
    body = req.body.body
    eventDateTime = req.body.eventDateTime
    source = req.body.username
    username = req.body.username
    tags = req.body.tags

    res_data = {}
    res_data['username'] = username
    res_data['title'] = title
    
    async.parallel({


        'OfficialSource': function(callback) {
            OfficialSource.findOne({'username' : username})
            .exec(callback);
        },

    }, function(err, result) {

        if(err) {
            res_data['message'] = 'Some error occured'
            res_data['status'] = 'failure'
            console.log('Some error occured')
            res.json(res_data)
        }

        if (result.OfficialSource != null) {

            notice_data = {}
            notice_data.title = title
            notice_data.body = body
            notice_data.source = source
            notice_data.tags = tags

            if (eventDateTime == null)
                notice_data.isEvent = false
            else
                notice_data.isEvent = true
            
            var new_notice = new Notice(notice_data)
            new_notice.save(function(err, instance) {
                if(err) {
                    res_data['message'] = 'Some error occured'
                    res_data['status'] = 'failure'
                    console.log('Some error occured')
                    res.json(res_data)
                }
                else {
                    res_data['message'] = 'Notice created successfully'
                    res_data['status'] = 'success'
                    console.log('Notice created successfully!')
                    console.log(new_notice)
                    res_data['url'] = new_notice.url
                    res.json(res_data)
                }
            });

        }
        else {
            res_data['status'] = 'failure'
            res_data['message'] = 'user not authorized to create notice.'
            res.json(res_data)
        }

    });

}

exports.get_notice = function(req, res) {

    notice_id = req.params.noticeID;

    var res_data = {};
    res_data.noticeID = notice_id
    var obj_id = new mongoose.Types.ObjectId(notice_id);

    Notice.findOne({'_id': obj_id}, function(err, result){
        if (err) next(err);

        res_data.notice = result
        console.log('Notice Fetched!');
        res.json(res_data);
    });
};

