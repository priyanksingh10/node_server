const passport = require('passport/lib');
const { LocalStrategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const user = { username, password };
    return done(null, user);
  }));
};
