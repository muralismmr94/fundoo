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
var UserModel = require('../../models/users');
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
// creating an empty function
function allFiles(){ }

// exporting the register user 
allFiles.prototype.register = {
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
    let user = await UserModel.find({ 'email': params.email })
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
      let user1 = new UserModel(newuser);
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

      const url = `http://localhost:5000/emailVerification?token=${token}`
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

/**
 * **************************************************************************************
 *                                  LOGIN
 * **************************************************************************************
 */



/**
 * exporting the login function
 */
allFiles.prototype.login = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },

  //resolver function for login
  async resolve(_parent, params) {

    var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // validating the email
    if (!expression.test(params.email)) {
      return { "message": " email format error please check email id" }
    }
    // validating the password
    if (params.password.length < 5) {
      return { "message": "enter a password which has more than 5 characters" }
    }

    // finding the email in database
    var user = await UserModel.find({ 'email': params.email })
    // user is not found means return the unsuccess message
    if (user.length == 0) {
      console.log("login unsuccess please try again");
      return { "message": "login unsuccessful" }
    }
    if(user[0].verified === false){
      console.log("email verificatation failed....please check email id");
      return{
        "message":"email verification failed...please check email id"
      }
    }
    //user found means returns the success message 
    else {
      // comparing the password 
      let comUser = await bcrypt.compare(params.password, user[0].password);

      if (comUser) {
        var secret = "abcdefg"
        var token = jwt.sign({ id: user[0]._id }, secret, { expiresIn: "24h" });

        //creating redis client 
        var client = redis.createClient();
        client.set("token", token);
        client.get("token", function (err, result) {
          if (err) {
            console.log(err);
          }
          else {
            console.log('result get on redis login ==> ' + result);
          }
        });
        console.log("login success  ==>   " + token);
        return {
          //"message":`token genereated ==> ${token}`
          "message": "login successful"
        }
      } else {
        console.log("login unsuccess");
        return { "message": "login unsuccessful" }
      }
    }
  }
}


/**
 * ******************************************************************************************
*                                             FORGOT PASSWORD
*********************************************************************************************
 */


/**
 * exporting the function
 */
allFiles.prototype.forgotPassword = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  //resolver function to forgot password
  async resolve(_root, params) {
    var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //validating the email
    if (!expression.test(params.email)) {
      return { "message": " email format error please check email id" }
    }
    //finding the user mailin database
    var user = await UserModel.find({ 'email': params.email })
    //if user is find send to the email with url to reseting password.
    if (user.length > 0) {
      var secret = "abcdefg"
      var token = jwt.sign({ email: params.email }, secret, { expiresIn: "24h" });

      //creating redis client
      var client = redis.createClient();
      client.set("token", token);
      client.get("token", function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('result get on forgotPassword  ' + result);
        }
      });

      const url = `http://localhost:5000/resetPassword  /${token}`
      sendEmailer.sendEmailer(url, params.email);
      console.log("forgot password successfully executed" + token);

      return { "message": "forgot password executed" }
    }
    // not finding the user means its shows an error.
    else {
      console.log("forgot password unsuccessful");

      return { "message": "invalid user" }
    }
  }
}

/**
 * **********************************************************************************
 *                              RESET PASSWORD
 * **********************************************************************************
 */

//exporting the reset password
allFiles.prototype.resetPassword = {
  type: UserType,
  args: {
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    conformpassword: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },

  //resolver function for reset password
  async resolve(_parent, params, context) {
    //validating the password
    if (params.password < 5) {
      return { "message": "enter a password which has more than 5 characters" }
    }
    // validating the conform password
    if (params.conformpassword < 5) {
      return { "message": "enter a password which has more than 5 characters" }
    }

    // validating the password and conformpassword is matchs or not
    if (!(params.password == params.conformpassword)) {
      return {
        "message": "your entered password is not matched please re-enter "
      }
    } else {
      var secret = "abcdefg"
      //verifing the token.
      const payload = await jwt.verify(context.token, secret)
      // updating the password 
      userUpdate = await UserModel.updateOne({ "email": payload.email },
       { $set: { "password": hash(params.password) } })
      if (userUpdate) {
        console.log("user resetpassword successfully");
        return {
          "message": "user updated successfully"
        }
      }
      else {
        console.log("user resetpassword unsuccessfully");

        return {
          "message": "user updated failed "
        }
      }
    }
  }
}

/**
 * ****************************************************************************
 *                                EMAIL VERIFICATION
 * ****************************************************************************
 */


/**
* exporting the emailverificatiion function
*/
allFiles.prototype.emailVerification = {
  type: UserType,
  /**
   * resolver function for email verification  
   * @param {*} root  :it is used to fetching the parant result 
   * @param {*} params :it is used to fetching the client enter value
   * @param {*} context :object shared by all resolvers
   */
  async resolve(_root, _params, context) {
    //verifing the token
    const secret = "abcdefg"
    const payload = await jwt.verify(context.token, secret)
    // setting the verification is true and updating in database.
    userUpdate = await UserModel.updateOne({ "_id": payload.id }, { $set: { "verified": true } })
    if (userUpdate) {
      return {
        "message": "verified successfully"
      }
    }
    else {
      return {
        "message": "verified unsuccessfull "
      }
    }
  }
}

module.exports= new allFiles;
