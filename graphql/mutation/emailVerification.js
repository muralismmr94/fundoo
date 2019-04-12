/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : it is used to verification the email is valid or not
 * @description
 * @file    : emailVerification.js
 * @overview :this file is written for verifining the email is valid or not .
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * require the modules
 */
var UserModel = require('../../models/users');
var jwt = require('jsonwebtoken');
var userAuth = require('../types/users').userAuth;

/**
 * exporting the emailverificatiion function
 */
exports.emailVerification = {
    type: userAuth,
    /**
     * resolver function for email verification  
     * @param {*} root  :it is used to fetching the parant result 
     * @param {*} params :it is used to fetching the client enter value
     * @param {*} context :object shared by all resolvers
     */
    async resolve(_root, _params, context) {

        const secret = "abcdefg"
        //console.log(context.token)
        //verifing the token
        const payload = await jwt.verify(context.token, secret)
        // setting the verification is true and updating in database.
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

