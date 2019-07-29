var express = require('express');
var router = express.Router();
let FilesControoler = require("../app/Controllers/FilesController");
let Helpers = require("../app/Helpers/index");
router.get("voice/:id", Helpers.isLogged,FilesControoler.sendAudio);

module.exports = router;
