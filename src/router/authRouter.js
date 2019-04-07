const express = require('express');
const passport = require('passport');
const authController = require('../controller/auth-controller');

const authRouter = express.Router();


function router() {
  authRouter.route('/signUp')
    .get((req, resp) => {
      authController.getLoginPage(req, resp, 'signup', { title: 'Please Sign up' });
    })
    .post((req, resp) => {
      authController.createUser(req, resp);
    });

  authRouter.route('/signIn')
    .get((req, resp) => {
      authController.getLoginPage(req, resp, 'signin', { title: 'Please Sign in' });
    })
    .post(authController.authenticate());

  authRouter.route('/profile')
    .get((req, resp) => {
      authController.goToProfile(req, resp);
    });

  authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


  authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/signin' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/task');
    });

  return authRouter;
}

module.exports = router;
