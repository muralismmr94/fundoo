/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : creating a login user 
 * @description
 * @file    : login.js
 * @overview :login user class is defined.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * required the files.
 */
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/**
 * exporting the login function
 */
exports.login = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    //resolver function for login
    async resolve(_parent, params) {

        var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        // validating the email
        if (!expression.test(params.email)) {
            return { "message": " email format error please check email id" }
        }
        // validating the password
        if (params.password.length < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }

        // finding the email in database
        var user = await UserModel.find({ 'email': params.email })
        // user is not found means return the unsuccess message
        if (user.length == 0) {
            console.log("login unsuccess please try again");
            return { "message": "login unsuccessful" }

        }
        //user found means returns the success message 
        else {
            // comparing the password 
            let comUser = await bcrypt.compare(params.password, user[0].password);

            if (comUser) {
                var secret = "abcdefg"
                var token = jwt.sign({ email: params.email }, secret, { expiresIn: "24h" });
                console.log("login success  ==>   " + token);
                return {
                    //"message":`token genereated ==> ${token}`
                    "message": "login successful"
                }
            } else {
                console.log("login unsuccess");
                return { "message": "login unsuccessful" }
            }
        }
    }
}
