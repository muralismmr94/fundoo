var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TokenModule = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');