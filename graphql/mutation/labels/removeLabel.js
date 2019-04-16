//importing the files
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var labelModel = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

// exporting the remove label
exports.removeLabel = {
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
            // find the label and deletw
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