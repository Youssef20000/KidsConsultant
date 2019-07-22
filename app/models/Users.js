var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new Schema({
    email: {type:String,required:true},
    name: {type:String,required:true},
    photo:{type:String,default: "/img/icons/man.png"},
    password: {type:String},
    googleId:{type:String},
    country:{type:String},
    phone:{type:Number},
    role:{type:String,default:'client'}
});
userSchema.methods.encPass = function(pass){
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(5),null);
};
userSchema.methods.checkPass = function(pass,hash){
        return bcrypt.compareSync(pass, hash);
};
module.exports = mongoose.model("User",userSchema);
