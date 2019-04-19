var mongoose = require('mongoose');
var Schemaaa = mongoose.Schema;

var notesSchema = new Schemaaa({
    userId: {
        type:String,
        required:true
    },
    labelId:[{
        // type:String,
        // required:true
        type:Schemaaa.Types.ObjectId,
        ref:"labelSchema"
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