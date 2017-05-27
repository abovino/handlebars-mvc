const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const models        = require('./../models');

module.exports = function(passport) {
  console.log('');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Use LocalStrategy to handle local signup authentication
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err)
          console.log(err);
        
        console.log(hash);
      });
      console.log('PASSPORT SIGN UP STRATEGY');
      process.nextTick(function() {
        models.User.findOne({
          where: {
            $or: [
              {
                username: req.body.username
              },
              {
                email: req.body.email
              }
            ]
          } 
        }).then(function(user) {
          if (!user) {
            models.User.create({
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
              dob: req.body.dob
            }).then(function(user) {
              console.log("USER CREATED");
              console.log(user.dataValues);
              return done(null, username)
            })
          } else {
            console.log("USER FOUND");
            console.log(user);
            return done(null, false);
          }
        })
      })
    })
  );

  // Use LocalStrategy to handle local login authentication
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, done) {
      // Search DB for user by email
      process.nextTick(function() {
        models.User.find({
          where: {
            email: email
          }
        }).then(function(user, err) {
          if (err) {
            return done(err)
          }

          if (!user) {
            return done(null, false, req.flash('userNotFound', '*Email not found!*'));
          }

          if (password != user.password) {
            return done(null, false, req.flash('userNotFound', '*Invalid password!*'));
          }

          if (password == user.password) {
            console.log(user.dataValues);
            return done(null, user);
          }
        }).catch(err => {
          if (err) {
            return done(err, false);
          }
        })
      })
    })
  );

}