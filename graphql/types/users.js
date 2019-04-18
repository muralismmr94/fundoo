/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : defining the types of graphql objects
 * @description
 * @file    : users.js
 * @overview :it is used to defining the types of the system.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * require the necesarry modules types of graphql
 */
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

/**
 * exporting the user types
 */
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: GraphQLID
      },
      firstname: {
        type: GraphQLString
      },
      lastname: {
        type:GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type:GraphQLString
      }
    }
  }
});

/**
 * exporting the user auth type.
 */
exports.userAuth = new GraphQLObjectType({
  name: 'userAuth',
  fields: function () {
    return {
      message: {
        type: GraphQLString
      }
    }
  }
});

//exporting the label type
exports.labelType = new GraphQLObjectType({
  name: 'labelUser',
  fields: function () {
    return {
      label: {
        type:GraphQLString
      }
    }
  }
});

// exporting notes type 
exports.noteType = new GraphQLObjectType({
  name:'noteUser',
  fields:function(){
    return{
      _id:{
        type:GraphQLString
      },
      title:{
        type:GraphQLString
      },
      description:{
        type:GraphQLString
      },
      labelId:{
        type:GraphQLString
      },
      userId:{
        type:GraphQLString
      }
    }
  }
})
