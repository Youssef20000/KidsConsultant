'use strict';
let paypal = require('paypal-rest-sdk');

// paypal auth configuration
let config = {
    "api" : {
        "mode" : process.env.PAYPAL_MODE,     // uncomment this line when payment is in live environment...
        "client_id":process.env.PAYPAL_CLIENT,
        "client_secret":process.env.PAYPAL_SECRET,
        //"client_id" : "AaLCmuqgAo-jy6t30kWVWWB7fxlKUSwWSmAV7VnMpl0OcT_aqiqfFoVFx1UAYWQfmNp_-OKoMqcmOQid",  // your paypal application client id
        //"client_secret" : "EB0A3e12aOixakr5i0ZKMTnnCuhSnwmoWGgXSewICz7Rw-GTiWfuyDBOccuVy5z-gXHG7lTSGv8jUM_4" // your paypal application secret id
    }
};

paypal.configure(config.api);

module.exports = paypal;