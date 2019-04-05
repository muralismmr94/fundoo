const express = require("express");
const mongoose = require('mongoose');
const dbConfig = require('./config/config');
const expressGraphQl = require("express-graphql");
const cors=require('cors');
const bodyParser = require('body-parser');
//const bodyParser = require('body-parser-graphql');

const app = express();
//app.use(cors());
//app.use(bodyParser.graphql())
//app.use(bodyParser.json)// parsing application json
//app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = require('./graphql/index').userSchema;
app.use('/graphql', expressGraphQl({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 2019
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