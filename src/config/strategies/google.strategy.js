const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const debug = require('debug')('app:google.strategy');
const SETTINGS = require('../../../env-vars');

module.exports = function googleStrategy() {
  passport.use(new Strategy({
    clientID: SETTINGS.clientId,
    clientSecret: SETTINGS.clientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    debug(accessToken);
    debug(refreshToken);
    debug(profile);
    // TODO Add mongodb implementation for finding or creating user
    return done(null, profile);
  }));
};
