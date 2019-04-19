var passport = require('passport');
var User = require('../models/users');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
};
