/**
 * require the necessary files
 */

 var GraphQLObjectType =require('graphql').GraphQLObjectType;
var registerUser = require('./allFiles').register;
var loginUser = require('./allFiles').login;
var forgotPassword = require('./allFiles').forgotPassword;
var resetPassword = require('./allFiles').resetPassword;
var emailVerification = require('./allFiles').emailVerification;
var addLabel = require('./labels').addlabel;
var removeLabel = require('./labels').removeLabel;
var updateLabel = require('./labels').updateLabel;
var addNote = require('./notes').createNote;
var removeNote = require('./notes').deleteNotes;
var updateNote = require('./notes').updateNote;
/**
 * exporting the files 
 */
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  emailVerification,
  addLabel,
  removeLabel,
  updateLabel,
  addNote,
  removeNote,
  updateNote
}
})