var express = require('express');
var router = express.Router();
let Profile = require("../app/Controllers/Profile/HomeController");
let Helpers = require("../app/Helpers/index");
router.get('/',Helpers.isLogged, Profile.view);
router.get("/payments",Helpers.isLogged,Profile.getPayments);
router.get("/payment/:id",Helpers.isLogged,Profile.getPaymentReceipt);
router.get("/payment/download/:id",Helpers.isLogged,Profile.getInvoicePDF);
module.exports = router;
