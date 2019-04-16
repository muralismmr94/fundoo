//importing the required files
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var labelModel = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

// exporting the update label
exports.updateLabel = {
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
        console.log("payload id",payload.id);
        // find and delete the label
        var update = await labelModel.findOneAndUpdate({ "_id": param.id }, { $set: { "label": param.label } })
        if (update) {
            console.log("label updated successfully")
            return{
                message:"label updated successfully"
            }
        }else {
            console.log("label updated unsuccessfully")
        return{
            message:"label updated unsuccess"
        }
        }
    }

}