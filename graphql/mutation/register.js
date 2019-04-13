/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : register the user 
 * @description
 * @file    : register.js
 * @overview:This is used to register the user .
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

// require the files
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/users').userAuth;
var UsersModel = require('../../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var sendEmailer = require('../../sendmailer');
var redis = require('redis');



// generating the hash function.
function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

// exporting the register user 
exports.register = {
  type: UserType,
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

  // resolver function for register user
  async resolve(_root, params) {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //validating the email
    if (!format.test(params.email)) {
      return { "message": " email format error please check email id" }
    }
    // validating the password 
    if (params.password.length < 5) {
      return { "message": "enter a password which has more than 5 characaters" }
    }
    // finding the user in database
    let user = await UsersModel.find({ 'email': params.email })
    // if user is  not present means its going to enter new user 
    if (!user.length > 0) {
      //creating the new user values.
      const newuser = ({
        "firstname": params.firstname,
        "lastname": params.lastname,
        "email": params.email,
        "password": hash(params.password),
        "verified": false
      });
      // storing user to  database 
      let user1 = new UsersModel(newuser);
      user1.save();

      var secret = "abcdefg"
      //creating the token.
      var token = jwt.sign({ email: params.email }, secret);

      //creating redis client
      var client = redis.createClient();
      client.set("token", token);
      client.get("token", function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('result get on register ==> ' + result);
        }
      });

      const url = `http://localhost:5000/emailVerification/${token}`
      // sending the node mailer
      sendEmailer.sendEmailer(url, params.email);
      console.log("registration successful");
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


