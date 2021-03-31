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
    const user = await UsersDBApi.findBy( {email: token.user.email});

    if (user && user.disabled) {
      return done (new Error(`User '${user.email}' is disabled`));
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

function socialStrategy(email, profile, provider, done) {
  db.user.findOrCreate({where: {email, provider}}).then(([user, created]) => {
    const body = {
      id: user.id,
      email: user.email,
      name: profile.displayName,
    };
    const token = helpers.jwtSign({user: body});
    return done(null, {token});
  });
}
