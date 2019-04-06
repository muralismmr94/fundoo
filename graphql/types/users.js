var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

// User Type
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID) 
      },
      firstname: {
        type:new GraphQLNonNull(GraphQLString) 
      },
      lastname: {
        type:new GraphQLNonNull(GraphQLString)
      },
      email: {
        type:new GraphQLNonNull(GraphQLString)
      },
      password: {
        type:new GraphQLNonNull(GraphQLString)
      }

    }
  }
});

exports.userAuth = new GraphQLObjectType({
  name : 'userAuth',
  fields: function () {
    return {
    message : {type : GraphQLString},
    token:{type:GraphQLString}
    }
  }
})
  