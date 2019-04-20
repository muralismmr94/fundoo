
/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : creating a fundoo application
 * @description
 * @file    : server.js
 * @overview :crating register,login,forgotpassword and resetpassword .
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

//importing required modules
const express = require("express");
const mongoose = require('mongoose');
const dbConfig = require('./config/config');
const expressGraphQl = require("express-graphql");
const bodyparser = require('body-parser');
require('dotenv').config();
var redis = require('redis');
var passport = require('passport');
var session = require('express-session');

//define the application as as express
const app = express();
//importing the user schema
const userSchema = require('./graphql/index').userSchema;
//assaining the graphql api
app.use('/graphql', bodyparser.json(), expressGraphQl(req => ({
  schema: userSchema,
  rootValue: global,
  graphiql: true,
  context: req.query
})));

// Up and Running at Port 5000
const port = 5000;
// application listening the port
app.listen(port, () => {
  console.log('A GraphQL API running at port ' + port);
});
//database connection using mongoose
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("successfully connected to database ");
}).catch(() => {
  console.log("Unsuccess to connected to database");
  process.exit();
});


// creating redis server
var client = redis.createClient();
client.on('connect', function () {
  console.log('Redis client connection on');
});
client.on('error', function (err) {
  console.log('Something went wrong to connect on redis' + err);
});


// creating session
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true
}));
//initializing the passport
app.use(passport.initialize());
//creating session 
app.use(passport.session());


// exporting the module
module.exports = app;