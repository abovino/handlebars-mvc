const express       = require('express');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const exhbs         = require('express-handlebars');
const sequelize     = require('sequelize');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const path          = require('path');
const routes    = require('./routes/routes');

const PORT = 3000; // Add env variable for port later
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', routes);

app.listen(PORT, () => {
	console.log('Server listening on PORT 3000');
});