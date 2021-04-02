const express = require('express');

const passport = require('passport');
const CategoriesService = require('../services/categories');
const CategoriesDBApi = require('../db/api/categories');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.post('/', wrapAsync(async (req, res) => {
  await CategoriesService.create(req.body.data, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.put('/:id', wrapAsync(async (req, res) => {
  await CategoriesService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.delete('/:id', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  await CategoriesService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.get('/', wrapAsync(async (req, res) => {
  const payload = await CategoriesDBApi.findAll(
    req.query,
  );

  res.status(200).send(payload);
}));
router.get('/autocomplete', async (req, res) => {
  const payload = await CategoriesDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await CategoriesDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
