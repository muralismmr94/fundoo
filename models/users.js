/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : defining the module types of database 
 * @description
 * @file    : users.js
 * @overview :defining the schema of the database modules to storing the data.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * requiring the modules.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * defining the schema and their types.
 */
var userSchema = new Schema({
    firstname: {
        type: String,
        //required: true

    },
    lastname: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },

    verified: {
        type: Boolean,
        timestamps: true
    },
    verifyGit:{
        type:Boolean
    },
    gitUserName:{
        type:String
    },
    gitId:{
        type:String
    }


});
/**
 * assigning the userSchema to mongoose model
 */
var Model = mongoose.model('User', userSchema);
/**
 * exporting the model
 */
module.exports = Model;
