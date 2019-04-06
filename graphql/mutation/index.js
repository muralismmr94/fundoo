var registerUser = require('./register').register;
 var loginUser = require('./login').login;
 var resetPassword = require('./forgotPassword').forgotPassword;


module.exports = {
  registerUser,
  loginUser,
  resetPassword

}