var registerUser = require('./register').register;
var loginUser = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword;
var resetPassword = require('./resetPassword').resetPassword;
var emailVerification = require('./emailVerification').emailVerification;



module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  emailVerification
}