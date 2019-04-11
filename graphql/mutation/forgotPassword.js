/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : it is used to forgot password function is used to send the link in a particular email.
 * @description
 * @file    : forgotpassword.js
 * @overview :It is used to send link to reset password.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * requiring the modules
 */
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var sendmailer = require('../../sendmailer');
var jwt = require('jsonwebtoken');

/**
 * exporting the function
 */
exports.forgotPassword = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    //resolver function to forgot password
    async resolve(_root, params) {
        var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        //validating the email
        if (!expression.test(params.email)) {
            return { "message": " email format error please check email id" }
        }
        //finding the user mailin database
        var user = await UserModel.find({ 'email': params.email })
        //if user is find send to the email with url to reseting password.
        if (user.length > 0) {
            var secret = "abcdefg"
            var token = jwt.sign({ email: params.email }, secret, { expiresIn: "24h" });
            const url = `http://localhost:5000/resetPassword/${token}`
            sendmailer.sendEmailer(url, params.email);
            console.log("forgot password successfully executed" + token);

            return { "message": "forgot password executed" }
        }
        // not finding the user means its shows an error.
        else {
            console.log("forgot password unsuccessful");

            return { "message": "invalid user" }
        }
    }
}
