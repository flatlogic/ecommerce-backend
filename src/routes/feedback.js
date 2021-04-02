const express = require('express');

const passport = require('passport');
const FeedbackService = require('../services/feedback');
const FeedbackDBApi = require('../db/api/feedback');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.post('/', wrapAsync(async (req, res) => {
  await FeedbackService.create(req.body.data, req.currentUser || {id: "7facf8cc-0af5-448a-a17c-84bbf22f2ded", email: "admin@flatlogic.com"});
  const payload = true;
  res.status(200).send(payload);
}));

router.put('/:id', wrapAsync(async (req, res) => {
  await FeedbackService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.delete('/:id', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  await FeedbackService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.get('/', wrapAsync(async (req, res) => {
  const payload = await FeedbackDBApi.findAll(
    req.query,
  );

  res.status(200).send(payload);
}));
router.get('/autocomplete', async (req, res) => {
  const payload = await FeedbackDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await FeedbackDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
