
const { validationResult } = require('express-validator');

class RegisterController {
    static view(req,res){
        var messages = req.flash('error');
        res.render('auth/signup', {title: "Sign Up ", csrf: req.csrfToken(),messages:messages});
    }
    static Register(req,res) {

        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('auth/signup', {errs: errors.array(),csrf: req.csrfToken()});
        } else {
            require("passport").authenticate("local.signup", {
                successRedirect: "/profile",
                failureRedirect:"/signup",
                failureFlash:true
            })(req, res); // <---- ADDD THIS
        }
    }
}
module.exports= RegisterController;