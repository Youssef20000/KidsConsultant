let User = require("../models/Users");
let Subscriptions = require("../models/Subscriptions");
class Helpers {
    static notLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/profile");
    }
    static isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/login");
    }
    static isAdmin(req,res,next){
        User.findOne({"_id":req.user._id}).then(user =>{
            if (user.role == "client"){
                return res.redirect('/not-allowed');
            } else {
                return next();
            }
        });
    }
    static isSubscribed(req,res,next){
        Subscriptions.findOne({"user":req.user._id}).then(sub => {
            if (Date.now() > sub.end){
                res.redirect('/subscribe');
            } else {
                next();
            }
        })
    }
}
module.exports = Helpers;