/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : creating notes
 * @description
 * @file    : notes.js
 * @overview :creating the notes
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * @since   :18/04/2019
 * 
 ***************************************************************************/
// importing the files

var GraphqlNonNull = require('graphql').GraphQLNonNull;
var GraphqlString = require('graphql').GraphQLString;
var notesModel = require('../../models/notesModel');
var userModel = require('../../models/users');
var userAuth = require('../types/users').userAuth;
var jwt = require('jsonwebtoken');
var labelModel = require('../../models/labelsModels');
//creating the notesfiles function
function notesfiles() { }

//creating createnote protocal
notesfiles.prototype.createNote = {
    type: userAuth,
    args: {
        labelId: {
            type: new GraphqlNonNull(GraphqlString)
        },

        title: {
            type: new GraphqlNonNull(GraphqlString)
        },
        description: {
            type: new GraphqlNonNull(GraphqlString)
        }
    },
    // resolve function for create note
    async resolve(_parent, params, context) {
        try {
            if (params.title.length < 3) {
                console.log("please enter a minimum 3 charecters in title");
                return {
                    'message': "please enter a minimum 3 charecters in title"
                }
            }
            if (params.description.length < 5) {
                console.log("please enter a minimum 5 charecters in description");
                return {
                    'message': "please enter a minimum 5 charecters in description"
                }
            }
            // verifying the token
            var secret = "abcdefg"
            var payload = await jwt.verify(context.token, secret);
            console.log(payload.id)
            var dataverify = await notesModel.findOne({ "title": params.title })

            if (dataverify) {
                console.log("label name already present please enter a different name");
                return {
                    "message": "label name already present please enter a different name"
                }
            }

            // the token is verified then its going to if condition 
            if (payload) {
                const newNote = {
                    title: params.title,
                    description: params.description,
                    userId: payload.id,
                    labelId: params.labelId
                }
                const store = new notesModel(newNote);
                store.save();
                console.log("notes created successfully");
                return {
                    "message": "notes created successfully"
                }

            }
            else {
                return {
                    "message": "notes created unsuccessfully"
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

},

    /**
     * *****************************************************************************************
     *                                      DELETE NOTES
     * ******************************************************************************************
     */
    // creating delete notes protocal
    notesfiles.prototype.deleteNotes = {
        type: userAuth,
        args: {
            noteId: {
                type: new GraphqlNonNull(GraphqlString)
            }
        },
        //async function for delete notes
        async resolve(parent, params, context) {
            try {
                //verifing the token 
                var secret = 'abcdefg'
                var payload = await jwt.verify(context.token, secret);
                if (payload) {
                    var deletenote = await notesModel.findOneAndDelete({ '_id': params.noteId });
                    if (deletenote) {
                        console.log("notes deleted successfully");

                        return {
                            "message": "notes deleted successfully"
                        }
                    }
                    else {
                        console.log("notes deleted unsuccessfully");
                        return {
                            "message": "notes deleted unsuccessfully"
                        }

                    }
                }
            } catch (err) {
                console.log(err);
                I
            }
        }


    },

    /**
     * **********************************************************************************
     *                                  UPDATE NOTE
     * **********************************************************************************
     */
    // create a update note protocal
    notesfiles.prototype.updateNote = {
        type: userAuth,
        // require arguments
        args: {
            noteId: {
                type: new GraphqlNonNull(GraphqlString)
            },
            title: {
                type: new GraphqlNonNull(GraphqlString)
            },
            description: {
                type: new GraphqlNonNull(GraphqlString)
            }
        },
        // async function for update note
        async resolve(parent, params, context) {
            if (params.title.length < 3) {
                console.log("please enter a minimum 3 charecters in title");
                return {
                    'message': "please enter a minimum 3 charecters in title"
                }
            }
            if (params.description.length < 5) {
                console.log("please enter a minimum 5 charecters in description");
                return {
                    'message': "please enter a minium 5 charecters in description"
                }
            }
             // varifing the token
            var secret = "abcdefg"
            var payload = await jwt.verify(context.token, secret);

            if (payload) {
                //find and update in database
                const update = await notesModel.findByIdAndUpdate({ "_id": params.noteId },
                    {
                        $set: {
                            "title": params.title,
                            "description": params.description
                        }
                    })
                console.log("update", update);

                if (update) {
                    console.log("notes updated successfully");
                    return {
                        "message": "notes updated successfully"
                    }
                }
                else {
                    console.log("notes updated unsuccess");
                    return {
                        "message": "notes updated unsuccess"
                    }

                }
            }

        }
    },

    /**
     * ****************************************************************************************
     *                                    LABEL NOTE ADD
     * ****************************************************************************************
     */
    // labelnote add protocal
    notesfiles.prototype.labelNoteAdd = {
        type: userAuth,
        //required arguments
        args: {
            noteId: {
                type: new GraphqlNonNull(GraphqlString)
            },
            labelId: {
                type: new GraphqlNonNull(GraphqlString)
            }
        },
        // async function for label note add 
        async resolve(parent, params, context) {
            // data verifing into database
            var dataverify = await notesModel.find({ "labelId": params.labelId })
            //already data available means its shows message
            if (dataverify.length > 0) {
                console.log("label already presented ");
                return {
                    "message": "label already presented"
                }
            }

            // find by id and update  into the node model data base 
            const update = await notesModel.findByIdAndUpdate({ "_id": params.noteId },
                {
                    $push: {
                        "labelId": params.labelId
                    }
                })
            console.log("update", update);
                //if updated the message will display success mesage
            if (update) {
                console.log("notes added into label successfully");
                return {
                    "message": "notes added into label successfully"
                }
            }
            else {
                console.log("notes added unsuccess");
                return {
                    "message": "notes added unsuccess"
                }

            }
        }

    },


    /**
        * ****************************************************************************************
        *                                    LABEL NOTE DELETE
        * ****************************************************************************************
        */
       // create a  protocal for labelnotedelete
    notesfiles.prototype.labelNoteDelete = {
        type: userAuth,
        // required arguments
        args: {
            noteId: {
                type: new GraphqlNonNull(GraphqlString)
            },
            labelId: {
                type: new GraphqlNonNull(GraphqlString)
            }
        },
        // async function for label note delete
        async resolve(parent, params, context) {

            var dataverify = await notesModel.find({ "labelId": params.labelId })
            if (dataverify.length < 0) {
                console.log("label not presented ");
                return {
                    "message": "label not presented"
                }
            }

            // noteid is checking in database its existing means updated  
            const update = await notesModel.findOneAndUpdate({ "_id": params.noteId },
                {
                    $pull: {
                        "labelId": params.labelId
                    }
                })
            console.log("upadte", update);

            if (update) {
                console.log("notes deleted successfully");
                return {
                    "message": "notes deleted successfully"
                }
            }
            else {
                console.log("notes deleted unsuccess");
                return {
                    "message": "notes deleted unsuccess"
                }

            }
        }

    }



// exporting the module

module.exports = new notesfiles;
