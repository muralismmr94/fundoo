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
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var UserModel = require('../../models/users');
var userType = require('../types/users').userType;
var labelModel = require('../../models/labelsModels');
var labelType = require('../types/users').labelType;
//const jwt = require('jsonwebtoken');

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
      },

      //creating the labels model 
      labels: {
        type: new GraphQLList(labelType),
        args: {
          userId: {
            type: GraphQLString
          }
        },
        //resolve function for label model
        resolve: async (_parant, args) => {
          const labels = await labelModel.find({ "userid": args.userId })
          
          if (!labels) {
            throw new Error('labels not available')
          }
          return labels
        }

      }


    }
  }
})
