var express = require('express');
var path = require('path');
var app = express();
const fileUpload = require('express-fileupload');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.locals.appTitle = "KidsCare Consultant"    ;
app.use(fileUpload());


module.exports = app;
