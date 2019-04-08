const multer = require("multer");
const path = require('path')
const fs = require('fs')

var appDir = path.dirname(require.main.filename);

const handleError = (err, res) => {

    console.log(err)
    res_data = {}
    res_data.status = 'failure'
    res
      .status(500)
      .json(res_data)
  };

  exports.poster_upload = function(req, res) {

    /*
        <form method="post" enctype="multipart/form-data" action="http://localhost:8080/notice/upload">
        <input type="file" name="file">
        <input type="submit" value="Submit">
        </form>
    */

    res_data = {}

    const tempPath = req.file.path;
    const targetPath = path.join(appDir, `../upload/${ req.file.filename }${path.extname(req.file.originalname).toLowerCase()}`);

    extensions_supported = ['.jpg', '.png', '.jpeg']
    if (extensions_supported.indexOf(path.extname(req.file.originalname).toLowerCase()) >= 0) {

      fs.rename(tempPath, targetPath, err => {
          
        if (err) {
            console.log(err)
            res_data.status = 'failure'
             return handleError(err, res);
        }

        res
          .status(200)
          .json({'status': 'success', 'message': "file uploaded", "filename": `/notice/poster/${ req.file.filename }${path.extname(req.file.originalname).toLowerCase()}`});
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .json({'status': 'failure', 'message': "Only .png, .jpeg, .jpg files are allowed!"});
      });
    }
  }

  exports.poster_download = function(req, res) {

    filename = req.params.filename;
    var filepath = path.join(appDir, `../upload/${filename}`);
    res.sendFile(filepath);
  }