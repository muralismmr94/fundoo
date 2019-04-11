/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : it is used to write reseting the password
 * @description
 * @file    : resetPassword.js
 * @overview :This file is writing the resetting the password.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

// require the files.
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//generating the hashing password.
function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
//exporting the reset password
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

    //resolver function for reset password
    async resolve(_parent, params, context) {
        //validating the password
        if (params.password < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }
        // validating the conform password
        if (params.conformpassword < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }
        // validating the password and conformpassword is matchs or not
        if (!params.password == params.conformpassword) {
            return {
                "message": "your entered password is not matched please re-enter "
            }
        } else {
            var secret = "abcdefg"
            //verifing the token.
            const payload = await jwt.verify(context.token, secret)
            // updating the password 
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