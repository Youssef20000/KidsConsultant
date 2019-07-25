let Subscriptions = require("../../models/Subscriptions");
let Kids = require("../../models/Kids");
let Payments = require("../../models/Payments");
let createError = require('http-errors');
let fs = require("fs");
const PDFDocument = require("pdfkit");

class HomeController {
    static view(req,res,next){
        if (req.user.role == "client"){
            HomeController.getClientArea(req,res,next);
        }
    }
    static getClientArea(req,res,next){
        let data = {};
        Subscriptions.findOne({"user":req.user._id}).then(sub=>{
            data.sub = sub;
            Kids.find({"parent_id":req.user._id}).then(kids =>{
                res.render('profile/home',{sub:data.sub,kids:kids});
            });
        }).catch(err => {console.log(err)});
    }
    static getPayments(req,res,next){
        Payments.find({"user":req.user._id}).then(data =>{
            res.render('profile/payments',{payments:data});
        })
    }
    static getPaymentReceipt(req,res,next){
        Payments.findOne({"invoiceNum":req.params.id}).then(invoice=>{
            res.render('success',{invoice:invoice});
        })
    }
    static getInvoicePDF(req,res,next){
        Payments.findOne({"invoiceNum":req.params.id,"user":req.user._id}).then(invoice=>{
          console.log(invoice)
            if (!invoice)
              next(createError(400));
            const invoiceDoc = {
                shipping: {
                    name: req.user.name,
                    email:req.user.email,
                    paidBy:invoice.paidBy,
                },
                items: [
                    {
                        item: "Monthly Subscription",
                        description: "KidsCare Consultant Monthly Subscription",
                        quantity: 1,
                        amount:  process.env.Sub_price
                    }
                ],
                at:invoice.at,
                subtotal: process.env.Sub_price,
                paid:  process.env.Sub_price,
                invoice_nr: invoice.invoiceNum
            };
            let doc = new PDFDocument({ margin: 50 });

            HomeController.generateHeader(doc);
            HomeController.generateCustomerInformation(doc, invoiceDoc);doc.end();
            res.setHeader('Content-disposition', 'attachment; filename="' + invoice.invoiceNum + '.pdf');
            res.setHeader('Content-type', 'application/pdf')
            doc.pipe(res)
            //doc.pipe(fs.createWriteStream(__dirname+`/../../../storage/invoices-${invoice._id}.pdf`));
        });
    }


    static generateCustomerInformation(doc, invoice) {
        const shipping = invoice.shipping;
        doc
            .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
            .text(`Invoice Date: ${invoice.at.toDateString()}`, 50, 215)
            .text('User Name: '+shipping.name, 50, 230)
            .text('User Email: '+shipping.email, 50, 245)
            .text('Payment Method: '+shipping.paidBy, 50, 260)
            .text('Total Amount: '+invoice.subtotal+"$", 50, 275)
            .image(__dirname+"/../../../public/img/icons/pay.png",380,170,{width:200})
            .moveDown();
    }
    static generateHeader(doc) {
        doc
            .image(__dirname+"/../../../public/img/logo.png", 50, 45, { height:50  })
            .fontSize(20)
            .text("Monthly Subscription Invoice",180,140)
            .fontSize(12)
            .text('2019 © All Rights Reserved To KidsCareClinics ',50,360,{align:"center"})
            .fontSize(10)
            .text("Giza ,6 of October", 400, 70, { align: "left" })
            .text("Sheikh Zayed , Downtown Mall ", 400, 82, { align: "left" })
            .text("+200106 623 1662", 400, 94, { align: "left" });
    }
}
module.exports = HomeController;