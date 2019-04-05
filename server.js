const express = require("express");
const mongoose = require('mongoose');
const dbConfig = require('./config/config')
const graphqlHTTP = require("express-graphql");

const app = express();

const userSchema = require('./graphql/index').userSchema;
app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

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