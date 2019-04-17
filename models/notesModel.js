var mongoose = require('mongoose');
var Schemaaa = mongoose.Schema;

var notesSchema = new Schemaaa({
    labelId: {
        type: Schemaaa.Types.ObjectId,
        ref: "userSchema"
    },
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
        default : false
    },
    color: {
        type: Boolean,
        default:false
    },
    trash: {
        type: Boolean,
        default:false
    },
    archive: {
        type: Boolean,
        default:false
    },
    pin: {
        type: Boolean,
        default:false
    },
    remainder: {
        type: Boolean,
        default:false
    }
})

var ModelNotes = mongoose.model('noteSchema', notesSchema);

module.exports=ModelNotes;