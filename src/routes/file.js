const safeFiles = require('../services/safe-files.cjs');

const express = require('express');

const config = require('../config');
const path = require('path');
const passport = require('passport');
const { fileRequest } = require('../services/file');

const router = express.Router();

router.get('/download', (req, res, next) => {
  const privateUrl = req.query.privateUrl;

  if (!privateUrl) {
    return res.sendStatus(404);
  }

  try {
    res.download(safeFiles.downloadPath(path.join(config.uploadDir, 'demo-uploads'), privateUrl));
  } catch (error) {
    next(error);
  }
});


router.post('/upload/products/image', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  fileRequest('products/image', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res, next);
});

router.post('/upload/feedbacks/image', (req, res, next) => {
  req.feedback = true
  fileRequest('feedbacks/image', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res, next);
});

router.post('/upload/blogs/image', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  fileRequest('blogs/image', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res, next);
});

router.post('/upload/users/avatar', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  fileRequest('users/avatar', {
    entity: null,
    maxFileSize: 10 * 1024 * 1024,
    folderIncludesAuthenticationUid: false,
  })(req, res, next);
});



module.exports = router;
