var express = require('express');
var router = express.Router();
const Helpers = require("../app/Helpers");
let SubscribeController = require("../app/Controllers/SubscribeController");

router.get('/',Helpers.isLogged,SubscribeController.view);

router.get("/pay",Helpers.isLogged,SubscribeController.payWithPayPal);
router.get("/execute",Helpers.isLogged,SubscribeController.execute);
router.get("/cancel",Helpers.isLogged,SubscribeController.cancel);

module.exports = router;
