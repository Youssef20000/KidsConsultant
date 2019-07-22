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
        if (req.user.role == "client"){
            res.redirect('/not-allowed');
        } else {
            next();
        }
    }
    static isSubscribed(req,res,next){
        Subscriptions.findOne({"user":req.user._id}).then(sub => {
            if (Date.now() > sub.end){
                res.redirect('/reSubscribe');
            } else {
                next();
            }
        })
    }
}
module.exports = Helpers;