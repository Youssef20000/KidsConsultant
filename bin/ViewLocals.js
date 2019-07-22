let User = require("../app/models/Users")
let ViewLocals = function (app) {
    app.use(function (req,res,next) {
        res.locals.auth = req.user
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    })
}
module.exports = ViewLocals;
