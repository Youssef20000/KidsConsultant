var express = require('express');
var router = express.Router();
let Helpers = require("../app/Helpers/index");
const KidsController = require("../app/Controllers/KidsController");
const { check } = require('express-validator');
let csrf = require('csurf');
router.use(csrf({cookies:false})); // Security, has to be after cookie and session.

router.get("/",[Helpers.isLogged,Helpers.isSubscribed],KidsController.allKids);

// Add Kid Routes

router.get("/add",[
    Helpers.isLogged,
    Helpers.isSubscribed,
],KidsController.addView);
router.post("/add",[
    Helpers.isLogged,
    Helpers.isSubscribed,
    check("name","Kid Name Is Required").exists(),
    check("age","Kid Name Is Required").exists(),
    check("gender","Kid Gender Is Required").exists()
],KidsController.handleAddKid);

module.exports = router;