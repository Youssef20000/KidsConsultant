let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let paymentSchema = new Schema({
    user:{type:String,required:true},
    amount:{type:Number},
    at:{type:Date,default: Date.now()},
    paidBy:{type:String},
    invoiceNum:{type:String},
    ppTransaction:{type:String},
});

module.exports = mongoose.model('Payments',paymentSchema);