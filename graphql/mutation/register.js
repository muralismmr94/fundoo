var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users');
var UserModel = require('../../models/users');
var bcrypt = require('bcrypt');

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

  async resolve(_root, params) {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!format.test(params.email)) {
      return { "message": " email format error please check email id" }
    }
    if (params.password.length < 5) {
      return { "message": "enter a password which has more than 5 characaters" }
    }

    let user =  await UserModel.find({ 'email': params.email })
    //console.log(user.length);
    if (!user.length>0) { 
      const newuser = ({
        "firstname": params.firstname,
        "lastname": params.lastname,
        "email": params.email,
        "password": hash(params.password)
      });
      let user1 =  new UserModel(newuser);

      user1.save();
      console.log("registration successful")
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


