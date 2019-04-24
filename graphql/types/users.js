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
var GraphQLList = require('graphql').GraphQLList;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var labelModel = require('../../models/labelsModels');
var noteModel = require('../../models/notesModel')


const userType = new GraphQLObjectType({
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
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      label: {
        type: GraphQLList(labelType),
        async resolve(parent, param, context) {
          console.log(parent._id)
          var labels = await labelModel.find({ "userid": parent._id })
          console.log(labels)
          return labels
        }

      },
      note:{
        type:GraphQLList(noteType),
        async resolve(parent,param,context){
          var notes= await noteModel.find({"userId":parent._id})
          return notes
        }
      }
    }
  }
});

const userAuth = new GraphQLObjectType({
  name: 'userAuth',
  fields: function () {
    return {
      message: {
        type: GraphQLString
      }
    }
  }
});


const labelType = new GraphQLObjectType({
  name: 'labelUser',
  fields: function () {
    return {
      label: {
        type: GraphQLString
      }
    }
  }
});
 
const noteType = new GraphQLObjectType({
  name: 'noteUser',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
   }
})
module.exports={
  noteType,
  labelType,
  userAuth,
  userType
}
