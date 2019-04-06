var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UserModel = require('../../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    async resolve(_parent, params) {

        var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!expression.test(params.email)) {
            return { "message": " email format error please check email id" }
        }

        if (params.password.length < 5) {
            return { "message": "enter a password which has more than 5 characters" }
        }

        var user = await UserModel.find({ 'email': params.email })

        if (user.length == 0) {
            console.log("login unsuccess please try again");
            return { "message": "login unsuccessful" }

        }
        else {
            let comUser = await bcrypt.compare(params.password, user[0].password)
            console.log("comUser: ", comUser);
            if (comUser) {
                var secret = "abcdefg"
                var token = jwt.sign({ email: params.email }, secret, { expiresIn: "24h" });
                return {
                    "message": "login successfully done",
                    "token": token
                }
            } else {
                console.log("login success");
                return { "message": "login unsuccessful" }
            }
        }
    }
}
