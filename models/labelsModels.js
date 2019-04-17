/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : defining the  label module types of database 
 * @description
 * @file    : users.js
 * @overview :defining the  labels schema of the database modules to storing the data.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * @since   :13/04/2019
 * ***************************************************************************/
// require the mongoose
var mongoose = require('mongoose');
//creating the mongoose schema insatnce
var Schema = mongoose.Schema;

// creating the labals Schema
var labelSchema = new Schema({
    userid: {
        // type: String,
        // required: true
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    label: {
        type: String,
        required: true
    }
})
// assigning the mongoose model
var ModuleLabel = mongoose.model('labelSchema', labelSchema);
// module exporting 
module.exports = ModuleLabel;
