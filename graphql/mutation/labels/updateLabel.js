var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var labelModel = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

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
    async resolve(parant, param, context) {
        var secret = "abcdefg"
        var payload = await jwt.verify(context.token, secret);
        console.log("payload id",payload.id);

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