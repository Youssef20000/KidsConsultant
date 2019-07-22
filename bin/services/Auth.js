var passport = require("passport")
var User = require("../../app/models/Users");
var localSt = require("passport-local").Strategy;
var bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});
passport.use('local.signup',
    new localSt({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, email, pass, done) {
        User.findOne({'email': email}, function (err, user) {
            if (err)
                return done(err);
            if (user)
                return done(null, false, {message: "Email Already In Use "});
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = newUser.encPass(pass);
            newUser.phone = req.body.phone;
            newUser.country = req.ipInfo.country || req.body.country || null;
            newUser.save(function (err, result) {
                if (err)
                    return done(err);

                return done(null, newUser);
            });
        });
    }));

passport.use("local.signin",new localSt({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
    function (req,email,pass,done) {
    User.findOne({"email":email},function (err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null,false,{message:"We Can't Find Any User With This Credentials"})
        if(!user.checkPass(pass,user.password))
            return done(null,false,{message:"We Can't Find Any User With This Credentials"})
        return done(null, user);
    })
}));