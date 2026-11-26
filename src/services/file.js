const formidable = require('formidable');
const fs = require('fs');
const config = require('../config');
const path = require('path');
const safeFiles = require('./safe-files.cjs');

exports.fileRequest = function fileRequest(folder, validations = {}) {
  return (req, res, next) => {
    if ((!req.currentUser && !req.feedback) || validations.entity) {
      res.sendStatus(403);
      return;
    }

    let uploadFolder = folder;
    if (validations.folderIncludesAuthenticationUid) {
      const uid = req.currentUser.authenticationUid;
      if (!uid) {
        res.sendStatus(403);
        return;
      }
      uploadFolder = folder.replace(':userId', uid);
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir;
    form.maxFileSize = validations.maxFileSize || 10 * 1024 * 1024;
    form.parse(req, (error, fields, files) => {
      if (error) {
        next(error);
        return;
      }
      const file = files.file;
      if (!file || typeof file.path !== 'string') {
        res.sendStatus(400);
        return;
      }
      try {
        const destination = safeFiles.uploadPath(
          path.join(config.uploadDir, 'demo-uploads'), uploadFolder, fields.filename
        );
        fs.copyFileSync(file.path, destination, fs.constants.COPYFILE_EXCL);
      } catch (error) {
        fs.unlinkSync(file.path);
        if (error.code === 'EEXIST') {
          error.status = 409;
        }
        next(error);
        return;
      }
      fs.unlinkSync(file.path);
      res.sendStatus(200);
    });
  };
};
