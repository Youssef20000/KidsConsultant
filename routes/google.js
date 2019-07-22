var express = require('express');
var router = express.Router();
let passport = require("passport")
const Helpers = require("../app/Helpers");


router.get('/',Helpers.notLogged,passport.authenticate('google',{
    scope:["profile","email"]
}));
router.get("/callback",[Helpers.notLogged,passport.authenticate('google')] ,(req,res)=>{
    res.redirect('/profile')
});
module.exports = router;
