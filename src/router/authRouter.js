const express = require('express');
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

  return authRouter;
}

module.exports = router;
