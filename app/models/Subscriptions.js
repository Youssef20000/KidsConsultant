let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let endDate = new Date();
let du = process.env.Subscription_Duration;
endDate.setDate(endDate.getDate() + parseInt(du));

let subscriptionSchema = new Schema({
    user:{type:String,required:true},
    amount:{type:Number},
    invoiceNum:{type:String},
    at:{type:Date,default: Date.now()},
    end:{type:Date,default: endDate},
});
subscriptionSchema.methods.leftDays = function(){
    let ms = 1000*60*60*24;
    return (this.end - Date.now())/ms;
};

module.exports = mongoose.model('Subscriptions',subscriptionSchema);