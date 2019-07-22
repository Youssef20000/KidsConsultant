const { validationResult } = require('express-validator');

class LoginController {
    static view(req,res){
        var messages = req.flash('error');
        res.render('auth/login', {title: "Sign In ", csrf: req.csrfToken(),messages:messages});
    }
    static login(req,res){
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('auth/login', {errs: errors.array(),csrf: req.csrfToken()});
        } else {
            require("passport").authenticate("local.signin", {
                successRedirect: "/profile",
                failureRedirect:"/login",
                failureFlash:true
            })(req,res); // <---- ADDD THIS
        }
    }
}
module.exports= LoginController;