const express = require('express');
const passport = require('passport');

const config = require('../config');
const AuthService = require('../services/auth');
const ForbiddenError = require('../services/notifications/errors/forbidden');
const EmailSender = require('../services/email');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.put('/password-reset', wrapAsync(async (req, res) => {
  const payload = await AuthService.passwordReset(req.body.token, req.body.password, req,);
  res.status(200).send(payload);
}));

router.put('/password-update', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  const payload = await AuthService.passwordUpdate(req.body.currentPassword, req.body.newPassword, req);
  res.status(200).send(payload);
}));

router.post('/send-email-address-verification-email', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  if (!req.currentUser) {
    throw new ForbiddenError();
  }

  await AuthService.sendEmailAddressVerificationEmail(req.currentUser.email);
  const payload = true;
  res.status(200).send(payload);
}));

router.post('/send-password-reset-email', wrapAsync(async (req, res) => {
  await AuthService.sendPasswordResetEmail(req.body.email,);
  const payload = true;
  res.status(200).send(payload);
}));

router.post('/signin/local', wrapAsync(async (req, res) => {
  const payload = await AuthService.signin(req.body.email, req.body.password, req,);
  res.status(200).send(payload);
}));

router.post('/signup', wrapAsync(async (req, res) => {
  const payload = await AuthService.signup(req.body.email, req.body.password, req,);
  res.status(200).send(payload);
}));

router.put('/profile', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  if (!req.currentUser || !req.currentUser.id) {
    throw new ForbiddenError();
  }

  await AuthService.updateProfile(req.body.profile, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.put('/verify-email', wrapAsync(async (req, res) => {
  const payload = await AuthService.verifyEmail(req.body.token, req);
  res.status(200).send(payload);
}));

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (!req.currentUser || !req.currentUser.id) {
    throw new ForbiddenError();
  }

  const payload = req.currentUser;
  res.status(200).send(payload);
});

router.get('/email-configured', (req, res) => {
  const payload = EmailSender.isConfigured;
  res.status(200).send(payload);
});

router.get('/signin/google', (req, res, next) => {
  passport.authenticate("google", {scope: ["profile", "email"], state: req.query.app})(req, res, next);
});

router.get('/signin/google/callback', passport.authenticate("google", {failureRedirect: "/login", session: false}),

  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

router.get('/signin/microsoft', (req, res, next) => {
  passport.authenticate("microsoft", {
    scope: ["https://graph.microsoft.com/user.read openid"],
    state: req.query.app
  })(req, res, next);
});

router.get('/signin/microsoft/callback', passport.authenticate("microsoft", {
    failureRedirect: "/login",
    session: false
  }),
  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

router.use('/', require('../helpers').commonErrorHandler);

function socialRedirect(res, state, token, config) {
  res.redirect(config.uiUrl + "/login?token=" + token);
}

module.exports = router;
