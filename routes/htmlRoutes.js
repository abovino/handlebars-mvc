const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Home',
		route: 'http://localhost:3000/'
	});
});

router.get('/:name', (req, res) => {
	res.render('home', {
		title: req.params.name,
		route: `http://localhost:3000/${req.params.name}`
	});
});

module.exports = router;