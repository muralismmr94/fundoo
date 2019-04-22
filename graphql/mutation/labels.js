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
var labelModel = require('../../models/labelsModels');
//var userModule = require('../../models/users');
var authType = require('../types/users').userAuth;
var jwt = require('jsonwebtoken');

// creating the function
function labels() { }

//create a prototype 
labels.prototype.addlabel = {
    type: authType,
    args: {
        // userid: {
        //     type: GraphQLString
        // },

        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    //creating resolver function for add labals
    async resolve(_parant, params, context) {
        try {
            if (params.label.length < 3) {
                return {
                    message: "enter a charecters minimum 3 if you want to generate a label"
                }
            }

            //const user = await userModule.findOne({'email': context.email});

            const secret = "abcdefg"
            //verifing the token
            const payload = await jwt.verify(context.token, secret)
            //console.log(payload)       
            //verifing email is true 
            if (payload) {
                const dataverify = await labelModel.find({ "label": params.label })
               // console.log("fdat verifd",dataverify);

                var pass;
                if (dataverify.length==0) {
                    const newLabel = ({
                        "userid": payload.id,
                        "label": params.label
                    })
                    const user = labelModel(newLabel);
                    pass = user.save();
                }
                else {
                    console.log("already presented same name please try another name");
                    return {
                        "message": "already presented same name please try another name"
                    }
                }
                if (pass) {
                    console.log("label generated successfully");
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

/**
 * *******************************************************************************
 *                          REMOVE LABEL
 * *******************************************************************************
 */

// exporting the remove label
labels.prototype.removeLabel = {
    type: authType,
    args: {
        id: {
            type: GraphQLString
        },
        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    //creating the resolve function on remove label
    async resolve(_parent, param, context) {
        try {
            const secret = "abcdefg"
            //verifing the token
            payload = jwt.verify(context.token, secret);
            // find the label and delete
            const user = await labelModel.findOneAndDelete({ '_id': param.id }).exec();
            //console.log(user);

            if (user) {
                console.log('remove label successfull');
                return {
                    message: "remove label successfully"
                }
            } else {
                console.log('remove label unsuccess');
                return {
                    message: "remove label unsuccess"
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

}

/**
 * ************************************************************************************
 *                              UPDATE LABEL
 * ************************************************************************************
 */

// exporting the update label
labels.prototype.updateLabel = {
    type: authType,
    args: {
        id: {
            type: GraphQLString
        },
        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    // creating the resolve function for update label
    async resolve(parant, param, context) {
        var secret = "abcdefg"
        // verifing the token
        var payload = await jwt.verify(context.token, secret);
        var update = await labelModel.findByIdAndUpdate({ "_id": param.id }, { $set: { "label": param.label } })
   
        // if updated is true its printed otherwise else printed
        if (update) {
            console.log("label updated successfully")
            return {
                message: "label updated successfully"
            }
        } else {
            console.log("label updated unsuccessfully")
            return {
                message: "label updated unsuccess"
            }
        }
    }

}
module.exports = new labels;