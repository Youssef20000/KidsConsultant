let Kids = require("../models/Kids");
const fs = require("fs");
const { validationResult } = require('express-validator');

class KidsController {
    // Render All Kids View
    static async allKids(req,res) {
        let kids = await Kids.find({
            "parent_id":req.user._id
        });
        res.send(JSON.stringify(kids));
    }

    // Render AddKid View Function and Handle Add Request
    static addView(req,res,next){
        res.render('profile/kids/add',{title:"Add Kid",csrf:req.csrfToken()});
    }
    static handleAddKid(req,res){
        var errors = validationResult(req);
        if (errors.array().length > 0){
            return res.render("profile/kids/add",{errs:errors.array()});
        }
        Kids.findOne({"name":req.body.name,"parent":req.user._id}).then(kid=>{
            if (kid){
                return res.render("profile/kids/add",{errs:[{msg:"Your Kid Is Already Exists"}]});
            }else{
                let kid = new Kids();
                let dir = __dirname+"/../../storage/parents/"+req.user.email+"/kids/"+req.body.name;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                kid.parent_id= req.user._id;
                kid.name= req.body.name;
                kid.age= req.body.age;
                if (req.files.photo){
                    let sampleFile = req.files.photo;
                    sampleFile.mv(dir+"/photo.jpg", function(err) {
                        if (err) {
                            console.log(err)
                            return res.status(500).send(err);
                        }
                    });
                    kid.photo= process.env.APP_URL+"/files/parents/"+req.user.email+"/kid/"+req.body.name+"/photo";
                }
                kid.save();
                res.redirect("/kids");
            }
        });
    }
}
module.exports = KidsController;