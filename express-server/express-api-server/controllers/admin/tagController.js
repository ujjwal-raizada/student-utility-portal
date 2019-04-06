var Admin = require('../../models/Admin');
var Tag = require('../../models/Tag');
var async = require('async');

exports.addtag = function(req, res) {
  var username = req.body.username;
  var tag = req.body.tag;

  console.log('Adding tag: ' + tag);

  async.parallel({
    'Admin' : function(callback) {
      Admin.findOne({'username' : username})
      .exec(callback);
    }
  }, function(err, result) {
    if(err) next(err);

    if(result.Admin == null){
      console.log("Insufficient permission for " + username);
    }
    else{
     async.parallel({
      'Tag' : function(callback) {
        Tag.findOne({'name' : tag})
        .exec(callback);
        }
      }, function(err, result) {
        if(err) next(err);

        if(result.Tag == null){
          Tag.create({'name' : tag}, 
            function(err, instance) {
              if(err) next(err);
            });
          console.log(tag + " has been added successfully");
        }
        else {
          console.log(" The tag: " + tag + " already exists");
        }
      });
    }
  });
  res.json({'status': 'success'});
};

exports.deletetag = function(req, res) {
  var username = req.body.username;
  var tag = req.body.tag;

  console.log('Deleting tag ' + tag);

  async.parallel({
    'Admin' : function(callback) {
      Admin.findOne({'username' : username})
      .exec(callback);
    }
  }, function(err, result) {
      if(err) next(err);

      if(result.Admin == null) {
        console.log("Insufficient permission for " + username);
      }
      else{
        async.parallel({
          'Tag' : function(callback) {
            Tag.findOne({'name' : tag})
            .exec(callback);
          }
        }, function(err, result) {
            if(err) next(err);

            if(result.Tag == null) {
              console.log('Cannot delete tag: ' + tag  + ' It does not exist');
            }
            else{
              Tag.deleteOne({'name' : tag}, 
                function(err, instance) {
                  if(err) next(err);
                });
              console.log('Tag: ' + tag + 'has been successfully removed');
            }
        });
      }
  }); 
  res.json({'status' : 'success'});
};