var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var TokenModule = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

exports.removeLabel = {
    type: authType,
    args: {
        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(_parent, _param, context) {
        try {
            const secret = "abcdefg"
            payload = jwt.verify(context.token, secret);
            //  const id=context._id;
            //  console.log(id);

            const user = await TokenModule.findOneAndDelete({'email':payload.email}).exec();
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