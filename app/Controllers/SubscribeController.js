let Subscription = require("../models/Subscriptions");
let paypal = require("../Helpers/Paypal");
let Payments = require("../models/Payments");
let crypto = require("crypto");
class SubscribeController {
    static view(req, res, next) {
        Subscription.findOne({"user": req.user._id}).then(data => {
            if (!data) {
                return res.render('subscribe');
            }
            if (data.leftDays() == 0) {
                return res.render('subscribe');
            }
            return res.redirect("/profile/payments");
        })
    }

    static payWithPayPal(req, res, next) {
        let response = {};

        /* JSON for Paypal starts */
        const payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": process.env.APP_URL+"/subscribe/execute",
                "cancel_url": process.env.APP_URL+"/subscribe/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Monthly Subscription",
                        "sku": "item",
                        "price": 20,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": 20
                },
                "description": "KidsCare Consultant Monthly Subscription"
            }]
        };
        /* JSON for Paypal ends */

        /* Creating Paypal Payment for Paypal starts */
        paypal.payment.create(payment, function (error, payment) {
            if (error) {
                console.log(error);
                res.abort(500);
            } else {
                response.paymentId = payment.id;
                var redirectUrl;
                response.payment = payment;
                //console.log(payment.links)
                for (var i = 0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
            //console.log(response);
            res.redirect(redirectUrl);
            }
        });
    }

    static execute(req,res,next){
        var response = {};
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const details = {
            "payer_id": payerId,
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Monthly Subscription",
                        "sku": "item",
                        "price": process.env.Sub_price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": 20
                },
                "description": "KidsCare Consultant Monthly Subscription"
            }]
        };
        paypal.payment.execute(paymentId, details, function (error, payment) {
            if (error) {
                response.error = false;
                response.message = "Payment Successful.";
                Payments.findOne({"ppTransaction":paymentId}).then(data =>{
                    return res.render("success",{invoice:data})
                })
              } else {
                let uID = Math.floor(Math.random() * Math.floor(9999999));
                Payments.findOne({"invoiceNum":uID}).then(data=>{
                    if (!data)
                        uID = Math.floor(Math.random() * Math.floor(9999999));
                });
                new Subscription({
                    user:req.user._id,
                    invoiceNum: uID,
                    paidBy:"PayPal Account",
                    ppTransaction:paymentId,
                }).save().then(da=>{
                    new Payments({
                        user:req.user._id,
                        amount:process.env.Sub_price,
                        paidBy: "PayPal",
                        ppTransaction:paymentId,
                        invoiceNum: uID
                    }).save().then(data=>{
                        res.render("success",{invoice:data})
                    });
                });
            }
        });
    }

    static successView(req,res,next){}
    static cancel(){}
}

module.exports = SubscribeController;