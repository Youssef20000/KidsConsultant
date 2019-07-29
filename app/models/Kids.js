let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let KidSchema = new Schema({
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    name:{type: String,required: true},
    age: {type:Number,required: true},
    gender:{type:String},
    photo:{type:String},
    files:[]
});

module.exports = mongoose.model('Kids',KidSchema);