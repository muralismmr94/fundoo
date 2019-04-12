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
var GraphQLNonNull = require('graphql').GraphQLNonNull;
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
        type: new GraphQLNonNull(GraphQLID)
      },
      firstname: {
        type: new GraphQLNonNull(GraphQLString)
      },
      lastname: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
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
})
