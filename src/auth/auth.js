const config = require('../config');
const providers = config.providers;
const helpers = require('../helpers');
const db = require('../db/models');

const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const UsersDBApi = require('../db/api/users');

passport.use(new JWTstrategy({
  passReqToCallback: true,
  secretOrKey: config.secret_key,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (req, token, done) => {
  try {
    if (!token.user?.id || !token.user.email) {
      return done(null, false);
    }
    const user = await UsersDBApi.findBy({ id: token.user.id, email: token.user.email });

    if (!user || user.disabled) {
      return done(null, false);
    }
    
    req.currentUser = user;
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.apiUrl + '/auth/signin/google/callback',
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    socialStrategy(profile.email, profile, providers.GOOGLE, done);
  }
));


passport.use(new MicrosoftStrategy({
    clientID: config.microsoft.clientId,
    clientSecret: config.microsoft.clientSecret,
    callbackURL: config.apiUrl + '/auth/signin/microsoft/callback',
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    const email = profile._json.mail || profile._json.userPrincipalName;
    socialStrategy(email, profile, providers.MICROSOFT, done);
  }
));

async function socialStrategy(email, profile, provider, done) {
  if (!email) return done(null, false);

  try {
    const [user] = await db.users.findOrCreate({ where: { email, provider } });
    if (user.disabled) return done(null, false);

    const token = helpers.jwtSign({
      user: { id: user.id, email: user.email, name: profile.displayName },
    });
    return done(null, { token });
  } catch (error) {
    return done(error);
  }
}
