/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : defining the  note module types of database 
 * @description
 * @file    : noteModel.js
 * @overview :defining the  note schema of the database modules to storing the data.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * @since   :18/04/2019
 * ***************************************************************************/
// require the mongoose
var mongoose = require('mongoose');
//creating a insatance of mongoose schema
var Schemaaa = mongoose.Schema;

// creating a note schema
var notesSchema = new Schemaaa({
    userId: {
        type: String,
        required: true
    },
    labelId: [{
        type: Schemaaa.Types.ObjectId,
        ref: "labelSchema"
    }],
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: Boolean,
        default: false
    },
    color: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    pin: {
        type: Boolean,
        default: false
    },
    remainder: {
        type: Boolean,
        default: false
    }
})

//mongoose model creation 
var ModelNotes = mongoose.model('noteSchema', notesSchema);
// exporting mongoose model
module.exports = ModelNotes;