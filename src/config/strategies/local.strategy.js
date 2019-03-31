const passport = require('passport/lib');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'matrix';

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    (async function mongodb() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const col = await db.collection('users');

        const user = await col.findOne({ username });
        debug(user);
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }));
};
