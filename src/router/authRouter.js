const express = require('express');
const debug = require('debug')('app:auth');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'matrix';

function router() {
  authRouter.route('/signUp')
    .get((req, resp) => {
      resp.render('signup', { title: 'Please signUp' });
    })
    .post((req, resp) => {
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
            resp.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  authRouter.route('/signIn')
    .get((req, resp) => {
      resp.render('signin', { title: 'Please Sign in' });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/signUp'
    }));

  authRouter.route('/profile')
    .get((req, resp) => {
      debug(req.user);
      resp.render('profile', { title: 'Profile', username: req.user.username });
    });

  return authRouter;
}

module.exports = router;
