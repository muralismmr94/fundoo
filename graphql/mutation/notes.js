var GraphqlNonNull = require('graphql').GraphQLNonNull;
var GraphqlString = require('graphql').GraphQLString;
var notesModel = require('../../models/notesModel');
var userModel = require('../../models/users');
var userAuth = require('../types/users').userAuth;
var jwt = require('jsonwebtoken');
var labelModel = require('../../models/labelsModels');

function notesfiles() { }

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
    async resolve(parent, params, context) {
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
                    'message': "please enter a minium 5 charecters in description"
                }
            }

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


            // var mongoose = require('mongoose');
            // var id = mongoose.Types.ObjectId(params.labelId);
            // var labelIdVerify = await labelModel.findById({ "_id":`ObjectId("${params.labelId}")`});
            // console.log(labelIdVerify == null)  
            // if (!labelIdVerify == null) {
            

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
            // else{
            //     return{
            //         "message":"label id is not a valid id"
            //     }
            // }
        
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

    notesfiles.prototype.deleteNotes = {
        type: userAuth,
        args: {
            noteId: {
                type: new GraphqlNonNull(GraphqlString)
            }
        },
        async resolve(parent, params, context) {
            try {

                var secret = 'abcdefg'
                var payload = await jwt.verify(context.token, secret);
                console.log(payload);
                if (payload) {
                    var deletenote = await notesModel.findOneAndDelete({ 'title': params.title });
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
    notesfiles.prototype.updateNote = {
        type: userAuth,
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
            var secret = "abcdefg"
            var payload = await jwt.verify(context.token, secret);

            if (payload) {
                console.log("parent titlt", parent._id);

                const update = await notesModel.findByIdAndUpdate({
                    "_id": params.id
                },
                    {
                        $set: {
                            "title": params.title,
                            "description": params.description
                        }
                    })
                console.log("upadte", update);

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
    }
module.exports = new notesfiles;
