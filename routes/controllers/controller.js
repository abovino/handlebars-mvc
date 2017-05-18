module.exports = {
  home: (req, res) => {
    res.render('home');
  },

  login: (req,res) => {
    res.render('login');
  },

  handleLogin: (req, res) => {
    console.log(req.body.email);
    var userData = {
      email: req.body.email,
      password: req.body.password
    };
    res.json(userData);
  },

  signup: (req, res) => {
    res.render('signup');
  },

  handleSignUp: (req, res) => {
    var user = req.body;
    console.log('First name: ' + req.body.firstName);
    console.log('Last name: ' + req.body.lastName);
    console.log('Email: ' + req.body.email);
    console.log('Username: ' + req.body.username);
    console.log('DOB: ' + req.body.dob);
    console.log('City: ' + req.body.city);
    console.log('State: ' + req.body.state);
    console.log('Password: ' + req.body.password);
    var userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      dob: user.dob,
      city: user.city,
      state: user.state,
      password: user.password
    };

    res.json(userData);
  }
}