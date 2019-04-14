var Admin = require('../../models/Admin');
var Tag = require('../../models/Tag');
var async = require('async');

exports.addtag = function(req, res) {
  var username = req.body.username;
  var tag = req.body.tag;
  var response = {
    'status' : 'failure',
    'message' : 'processing'
  }

  console.log('Adding tag: ' + tag);

  async.parallel({
    'Admin' : function(callback) {
      Admin.findOne({'username' : username})
      .exec(callback);
    }
  }, function(err, result) {
    if(err) {
      console.log('Error in Admin.findOne');
      response['status'] = 'failure';
      response['message'] = 'error';
      return res.json(response);
    };

    if(result.Admin == null){
      console.log("Insufficient permission for " + username);
      response['status'] = 'failure';
      response['message'] = 'insufficient permission';
      return res.json(response);
    }
    else{
     async.parallel({
      'Tag' : function(callback) {
        Tag.findOne({'name' : tag})
        .exec(callback);
        }
      }, function(err, result) {
        if(err) {
          console.log('Error in tag.findOne');
          response['status'] = 'failure';
          response['message'] = 'error';
          return res.json(response);
        };

        if(result.Tag == null){
          Tag.create({'name' : tag}, 
            function(err, instance) {
              if(err){
                console.log('Error in Tag.create');
                response['status'] = 'failure';
                response['message'] = 'error';
                return res.json(response);
              };
            });
          console.log(tag + " has been added successfully");
          response['status'] = 'success';
          response['message'] = 'tag added successfully';
          return res.json(response);
        }
        else {
          console.log(" The tag: " + tag + " already exists");
          response['status'] = 'failure';
          response['message'] = 'tag already exists';
          return res.json(response);
        }
      });
    }
  });
};

exports.deletetag = function(req, res) {
  var username = req.body.username;
  var tag = req.body.tag;
  var response = {
    'status' : 'failure',
    'message' : 'processing'
  };

  console.log('Deleting tag ' + tag);

  async.parallel({
    'Admin' : function(callback) {
      Admin.findOne({'username' : username})
      .exec(callback);
    }
  }, function(err, result) {
      if(err){
        console.log('Error in Admin.findOne');
        response['status'] = 'failure';
        response['message'] = 'error';
        return res.json(response);
      };

      if(result.Admin == null) {
        console.log("Insufficient permission for " + username);
        response['status'] = 'failure';
        response['message'] = 'insufficient permission';
        return res.json(response);
      }

      else{
        async.parallel({
          'Tag' : function(callback) {
            Tag.findOne({'name' : tag})
            .exec(callback);
          }
        }, function(err, result) {
            if(err){
              console.log('Error in Tag.findOne');
              response['status'] = 'failure';
              response['message'] = 'error';
              return res.json(response);
            };

            if(result.Tag == null) {
              console.log('Cannot delete tag: ' + tag  + ' It does not exist');
              response['status'] = 'failure';
              response['message'] = 'tag does not exist';
              return res.json(response);
            }
            else{
              Tag.deleteOne({'name' : tag}, 
                function(err, instance) {
                  if(err){
                    console.log('Error in Tag.deleteOne');
                    response['status'] = 'failure';
                    response['message'] = 'error';
                    return res.json(response);
                  };
                });
              console.log('Tag: ' + tag + 'has been successfully removed');
              response['status'] = 'success';
              response['message'] = 'tag has been removed';
              return res.json(response);
            }
        });
      }
  }); 
};