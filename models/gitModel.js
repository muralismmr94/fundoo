var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var gitUser = new Schema({
  name: String,
  someID: String
});


module.exports = mongoose.model('users', gitUser);
