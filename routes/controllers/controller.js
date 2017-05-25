module.exports = {
  home: (req, res) => {
    res.render('home');
  },

  login: (req,res) => {
    res.render('login');
  },

  signup: (req, res) => {
    res.render('signup');
  },

  // Custom middleware
  middleware: {
    // Checks to see if 'user' key exists on the req object
    // Pass in as second argument after route
    isAuthenticated(req, res, next) {
      if (!req.user) {
        res.redirect('/auth/fail')
      }
      // Continue to the next part of the route handler
      return next();
    },
    // Makes sure the user enters the same password in the 'confirm password' input
    confirmPassword(req, res, next) {
      // If both passwords match continue to next part in the route handler
      if (req.body.password === req.body.confirmPassword) {
        return next();
      }
      res.json("Passwords don't match");
    }

  }
}