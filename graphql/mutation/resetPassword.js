var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }

exports.resetPassword = {
    type: UserType,
    args: {
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        conformpassword: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(_parnt, params, context) {
        if (params.password < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }
        if (params.conformpassword < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }
        if (!params.password == params.conformpassword) {
            return {
                "message": "your entered password is not matched please re-enter "
            }
        } else {
            var secret = "abcdefg"
            const payload = await jwt.verify(context.token, secret, { expiresIn: "24h" })
            userUpdate = await UserModel.updateOne({ "email": payload.email }, { $set: { "password": hash(params.password) } })
            if (userUpdate) {
                console.log("user resetpassword successfully");
                return {
                    "message": "user updated successfully"
                }
            }
            else {
                console.log("user resetpassword unsuccessfully");
                
                return {
                    "message": "user updated failed "
                }
            }
        }
    }

}