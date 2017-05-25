const express       = require('express');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const exhbs         = require('express-handlebars');
const sequelize     = require('sequelize');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path          = require('path');
const routes    = require('./routes/index');

const PORT = 3000; // Add env variable for port later
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Initiate passport.js and session storage
app.use(session({ secret: 'notthatsecret' }));
app.use(passport.initialize());
app.use(passport.session());
// Require the passport configuration from ./config
require('./config/passport')(passport);

app.use('/', routes);

app.listen(PORT, () => {
	console.log('Server listening on PORT 3000');
});

module.exports = app;