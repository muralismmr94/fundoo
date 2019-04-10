// var GraphQLNonNull = require('graphql').GraphQLNonNull;
// var GraphQLString = require('graphql').GraphQLString;
// var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
//var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userAuth = require('../types/users').userAuth;


exports.emailVerification = {
    type: userAuth,


    async resolve(_parnt, params, context) {

        var secret = "abcdefg"
        const payload = await jwt.verify(context.token, secret, { expiresIn: "24h" })
        userUpdate = await UserModel.updateOne({ "email": payload.email }, { $set: { "verified": true } })
        if (userUpdate) {

            return {
                "message": "verified successfully"
            }
        }
        else {

            return {
                "message": "verified unsuccessfull "
            }
        }
    }
}

