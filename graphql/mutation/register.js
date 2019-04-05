var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users');
var UserModel = require('../../models/users');
var bcrypt = require(bcrypt);

function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

exports.register = {
  type: UserType.userAuth,
  args: {
    firstname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },

  resolve(_root, params) {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!format.test(params.email)) {
      return { "message": " email format error please check email id" }
    }
    if (params.password.length < 8) {
      return { "message": "enter a password which has more than 8 characaters" }
    }

    user = await UserModel.find({ 'email': params.email })
    //console.log(user)
    if (user.length == 0) {
      console.log("registration successful")
      let user1 = await new UserModel(params);
      const newuser = {
        "firstname": user1.firstname,
        "lastname": user1.lastname,
        "email": user1.email,
        "password": user1.password
      }

      newuser.save();
      return {
        "message": "registration successful"
      }
    }
    else {
      console.log("registration unsuccessful");

      return {
        "message": "registration unsuccessful , email already exists"
      }
    }


  }
}


