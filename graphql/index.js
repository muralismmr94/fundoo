//importing required types and files
var GraphQLSchema = require('graphql').GraphQLSchema;
var queryType = require('./queries/user').queryType;
var mutationindex = require('./mutation/index');
//exporting userSchema
exports.userSchema = new GraphQLSchema({
  query: queryType,
  mutation:  mutationindex
  })
