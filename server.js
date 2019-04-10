const express = require("express");
const mongoose = require('mongoose');
const dbConfig = require('./config/config');
const expressGraphQl = require("express-graphql");
const bodyparser= require('body-parser');
require('dotenv').config;

const app = express();

const userSchema = require('./graphql/index').userSchema;
app.use('/graphql',bodyparser.json(), expressGraphQl(req=>({
  schema: userSchema,
  rootValue: global,
  graphiql: true,
  context:{token:req.headers.authorization}
})));

// Up and Running at Port 5000
const port = 5000;
app.listen(port, () => {
  console.log('A GraphQL API running at port ' + port);
});

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("successfully connected to database ");
}).catch(() => {
  console.log("Unsucess to connected to database");
  process.exit();
});

module.exports = app