const express = require('express');
const debug = require('debug')('app:auth');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .get((req, resp) => {
      resp.render('signup', { title: 'signUp!' });
    });

  authRouter.route('/signUp')
    .post((req, resp) => {
      debug(req.body);
      req.login(req.body, () => {
        resp.redirect('/auth/profile');
      });
    });

  authRouter.route('/signIn')
    .get((req, resp) => {
      resp.render('signin', { title: 'Sign in' });
    });

  authRouter.route('/profile')
    .get((req, resp) => {
      debug(req.user);
      resp.render('profile', { title: 'Profile', username: req.user.username });
    });

  return authRouter;
}

module.exports = router;
