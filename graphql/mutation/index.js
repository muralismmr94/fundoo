/**
 * require the necessary files
 */
var registerUser = require('./allFiles').register;
var loginUser = require('./allFiles').login;
var forgotPassword = require('./allFiles').forgotPassword;
var resetPassword = require('./allFiles').resetPassword;
var emailVerification = require('./allFiles').emailVerification;
var addLabel = require('./labels/addlabels').addlabel;
var removeLabel = require('./labels/removeLabel').removeLabel;
var updateLabel = require('./labels/updateLabel').updateLabel


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
  removeLabel,
  updateLabel
}