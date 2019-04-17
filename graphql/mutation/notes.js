var GraphqlNonNull = require('graphql').GraphQLNonNull;
var GraphqlString = require('graphql').GraphQLString;
//var GRaphqlID  =require ('graphql').GraphQLID;
var notesModel = require('../../models/notesModel');
var userModel = require('../../models/users');
var userAuth = require('../types/users').userAuth;
var jwt = require('jsonwebtoken');

function notesfiles() { }

notesfiles.prototype.createNote = {
    type: userAuth,
    args: {

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
            var dataverify = await notesModel.findOne({ "title": params.title })
        
            if (dataverify) {
                console.log("label name already present please enter a different name");
                return {
                    "message": "label name already present please enter a different name"
                }
            }
            if (payload) {
                const newNote = {
                    title: params.title,
                    description: params.description,
                    labelId: payload.id
                }
                const store = new notesModel(newNote);
                store.save();
                console.log("notes created successfully");
                return {
                    "message": "nodes created successfully"
                }

            }
            else {
                return {
                    "message": "nodes created unsuccessfully"
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

    notesfiles.prototype.deleteNotes = {
        type: userAuth,
        args: {
            id: {
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

            }
        }


    },
    notesfiles.prototype.updateNote = {
        type: userAuth,
        args: {
            id: {
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
