var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var labelModel = require('../../../models/labelsModels');
var authType = require('../../types/users').userAuth;
var jwt = require('jsonwebtoken');

exports.removeLabel = {
    type: authType,
    args: {
        id:{
            type:GraphQLString
        },
        label: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(_parent, param, context) {
        try {
            const secret = "abcdefg"
            payload = jwt.verify(context.token, secret);
            //  const id=context.id;
             console.log(payload.id);

            const user = await labelModel.findOneAndDelete({'_id':param.id}).exec();
            console.log(user);
            
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