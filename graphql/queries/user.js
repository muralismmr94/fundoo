/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  :defining the quries of graphql  
 * @description
 * @file    : user.js
 * @overview :it is used to defining the quries of the graphql .
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * require the files 
 */
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var UserModel = require('../../models/users');
var userType = require('../types/users').userType;

/**
 * exporting the queryType function and creating the new object 
 */
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: function () {
          const users = UserModel.find().exec()
          if (!users) {
            throw new Error(' users not available')
          }
          return users
        }
      }
    }
  }
});