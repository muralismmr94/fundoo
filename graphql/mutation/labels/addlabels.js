/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : creating labals
 * @description
 * @file    : labals.js
 * @overview :creating the labals
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * @since   :13/04/2019
 * 
 ***************************************************************************/
// importing the files
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TokenModule = require('../../../models/labelsModels');
//var userModule = require('../../models/users');
var authtype = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

//exporting class
exports.addlabel = {
    type: authtype,
    args: {
        // email: {
        //     type: GraphQLString
        // },

        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    //creating resolver function for add labals
    async resolve(_parant, params, context) {
        try {
            if (params.label.length < 5) {
                return {
                    message: "enter a charecters minimum 5  if you want to generate a label"
                }
            }

            //const user = await userModule.findOne({'email': context.email});

            const secret = "abcdefg"
            //verifing the token
            const payload = jwt.verify(context.token, secret)
            //verifing email is true 
            if (payload.email) {
                const newLabel = ({
                    "email": payload.email,
                    "label": params.label
                })
                const user = TokenModule(newLabel);
                const pass = user.save();
                if (pass) {
                    console.log("label generated successfully")
                    return {
                        "message": "label generated successfully"
                    }
                } else {
                    console.log("label generate unsuccessful");

                    return {
                        "message": " label generate  unsuccessful"
                    }
                }
            }
            else {
                return {
                    message: "token verification fails"
                }
            }
        } catch (err) {
            console.log(err);

        }
    }
}
