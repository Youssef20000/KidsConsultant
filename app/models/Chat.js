let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ChatSchema = new Schema({
    kid_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kids'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    msg:{type:String},
    type:{type:String,default:"text"},
    url:{type:String},
    at:{type:Date,default: Date.now()}
});

module.exports = mongoose.model('Chat',ChatSchema);