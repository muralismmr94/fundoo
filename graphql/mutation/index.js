/**
 * require the necessary files
 */
var registerUser = require('./register').register;
var loginUser = require('./login').login;
var forgotPassword = require('./forgotPassword').forgotPassword;
var resetPassword = require('./resetPassword').resetPassword;
var emailVerification = require('./emailVerification').emailVerification;
var addLabel = require('./labels/addlabels').addlabel;
var removeLabel = require('./labels/removeLabel').removeLabel;


/**
 * exporting the files 
 */
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  emailVerification,
  addLabel,
  removeLabel
}