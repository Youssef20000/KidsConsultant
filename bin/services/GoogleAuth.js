let passport = require("passport");
let googleST = require("passport-google-oauth20");
let User = require("../../app/models/Users")

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

passport.use('google',new googleST({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback",
    passReqToCallback: true,
}, (req,accessToken, refreshToken, profile , done) => {
    User.findOne({googleId: profile.id}).then(user => {
        if (user)
            return done(null,user);
        new User({
            name:profile._json.name,
            email:profile._json.email,
            photo:profile._json.picture,
            googleId:profile.id,
            country:req.ipInfo.country || null
        }).save().then(newUser => {
            return done(null, newUser);
        }).catch(err=> { return done(err); });
    }).catch(err => {
        return done(err);
    });
}));