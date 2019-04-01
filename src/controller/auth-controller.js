const { MongoClient } = require('mongodb');
const debug = require('debug')('app:auth-controller');
const passport = require('passport');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'matrix';

function authController() {
  function createUser(req, resp) {
    const user = req.body;
    (async function mongodb() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to DB');
        const db = await client.db(dbName);

        const col = await db.collection('users');

        const response = await col.insertOne(user);

        req.login(response.ops[0], () => {
          resp.redirect('/task');
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getLoginPage(req, resp, viewName, data) {
    resp.render(viewName, data);
  }

  function authenticate() {
    return passport.authenticate('local', {
      successRedirect: '/task',
      failureRedirect: '/auth/signUp'
    });
  }

  function goToProfile(req, resp) {
    debug(req.user);
    resp.render('profile', { title: 'Profile', username: req.user.username });
  }

  return {
    createUser,
    getLoginPage,
    authenticate,
    goToProfile
  };
}

module.exports = authController();
