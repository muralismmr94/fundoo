var registerUser = require('./register').register;
 var loginUser = require('./login').login;
 var forgotPassword = require('./forgotPassword').forgotPassword;
 var resetPassword = require('./resetPassword').resetPassword;


module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword

}