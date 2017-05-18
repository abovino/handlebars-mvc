const express = require('express');
const router  = express.Router();
const index = require('./controllers/index.controller.js'); 

router.get('/', index.home);

router.get('/login', index.login);
router.post('/login', index.handleLogin);

router.get('/signup', index.signup);
router.post('/signup', index.handleSignUp);

module.exports = router;