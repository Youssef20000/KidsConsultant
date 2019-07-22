let Subscriptions = require("../../models/Subscriptions");
let Kids = require("../../models/Kids");
let Payyments = require("../../models/Payments");
class HomeController {
    static view(req,res,next){
        if (req.user.role == "client"){
            HomeController.getClientArea(req,res,next);
        }
    }
    static getClientArea(req,res,next){
        let data = {};
        Subscriptions.findOne({"user":req.user._id}).then(sub=>{
            data.sub = sub;
            Kids.find({"parent_id":req.user._id}).then(kids =>{
                res.render('profile/home',{sub:data.sub,kids:kids});
            });
        }).catch(err => {console.log(err)});
    }
    static getPayments(req,res,next){
        Payyments.find({"user":req.user._id}).then(data =>{
            res.render('profile/payments',{payments:data});
        })
    }
}
module.exports = HomeController;