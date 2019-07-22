let express = require("express");
let util = require("util");
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
const expressip = require('express-ip');
let MongoDBStore = require('connect-mongodb-session')(session);
util.log("Middleware Is Loaded");
let passport = require("passport");
let flash = require("connect-flash");
let Middleware = {
  load: function (app) {
      let store = new MongoDBStore({
          uri: 'mongodb://localhost/KidsCare',
          collection: 'Sessions'
      });
      store.on('error', function(error) {
          console.log(error);
      });
      app.use(logger('dev'));
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.use(require('express-session')({
          secret: 'kids@care@2019',
          resave: true,
          store:store,
          saveUninitialized: false
      }));
      app.use(flash());
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(expressip().getIpInfoMiddleware);
      require("./ViewLocals")(app);
  }
};

module.exports = Middleware;