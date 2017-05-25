const express    = require('express');
const router     = express.Router();
const passport   = require('passport');

// Load route controllers and custom middleware
const controller = require('./controllers/controller.js'); 

router.get('/', controller.home);

router.get('/login', controller.login);
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/fail'
}));

router.get('/signup', controller.signup);
router.post('/signup', controller.middleware.confirmPassword, passport.authenticate('local-signup', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/fail'
}));

router.get('/auth/success', controller.middleware.isAuthenticated, (req, res) => {
  res.json("user authenticated");
});

router.get('/auth/fail', (req, res) => {
  res.json("User NOT authenticated");
});

module.exports = router;