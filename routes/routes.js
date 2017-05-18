const express = require('express');
const router  = express.Router();
const controller = require('./controllers/controller.js'); 

router.get('/', controller.home);

router.get('/login', controller.login);
router.post('/login', controller.handleLogin);

router.get('/signup', controller.signup);
router.post('/signup', controller.handleSignUp);

module.exports = router;