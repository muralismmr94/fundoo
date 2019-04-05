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
        user = UserModel.find({ 'email': params.email })
        //const uModel = new UserModel(params);
       // console.log("umodel:", uModel.email);
        console.log("params: ", params.email);
        


        if (user == params.email) {
            console.log("login success");
            return {"message":"login successfully done"}
        } else {
            console.log("login unsuccess please try again");
            return {"message": "login unsuccess"}
        }
    }
}
