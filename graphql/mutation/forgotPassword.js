var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var sendmailer = require('../../sendmailer')
//var bcrypt = require('bcrypt');
var jwt =require('jsonwebtoken');

exports.forgotPassword = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    async resolve(_root, params) {
        var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!expression.test(params.email)) {
            return { "message": " email format error please check email id" }
        }

        var user = await UserModel.find({ 'email': params.email })
       // console.log(user);
        if (user.length > 0) {
            var secret = "abcdefg"
            var token = jwt.sign({ email: params.email }, secret, { expiresIn: "24h" });
            const url =`http://localhost:5000/resetPassword/${token}`
            sendmailer.sendEMailFunction(url,params.email); 
            return {"message":"valid user "}
        }
        else{
            return { "message": "invalid user" }
        }
    }
}
