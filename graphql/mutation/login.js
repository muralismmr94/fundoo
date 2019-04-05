var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users');
var UserModel = require('../../models/users');

exports.login = {
    type: UserType.userType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(_root, params) {
        const uModel = new UserModel(params);
        console.log(params.email);
        // console.log("root: ", root);
        console.log("params: ", params);
        console.log("mailkugokl: ", uModel.email);
       if(params.email == uModel.email){
        const newUser = uModel.user.email
        if (!newUser) {
          throw new Error('Error');
        }
        return newUser
    }else{
        console.log("not present");
    }
    }
}
