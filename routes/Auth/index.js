var express = require('express');
var router = express.Router();
var csrf = require("csurf");
var csrfProtection = csrf();
router.use(csrfProtection);
const { check } = require('express-validator');
const RegisterController = require(`../../app/Controllers/Auth/RegisterController`);
const LoginController = require("../../app/Controllers/Auth/LoginController")
const Helpers = require("../../app/Helpers");

router.get("/login",  Helpers.notLogged,LoginController.view);
router.get("/signup", Helpers.notLogged, RegisterController.view);

router.post("/login",[
    Helpers.notLogged,
    check('email',"Please Enter A Valid Email").isEmail(),
    check('password',"Password Is Required").exists()
],LoginController.login);
router.post("/signup", [
    Helpers.notLogged,
    check('email',"Please Enter A Valid Email").isEmail(),
    check('password',"Password Must Be Greater Than 8 Chars").isLength({ min: 8 })
], RegisterController.Register);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
module.exports = router;