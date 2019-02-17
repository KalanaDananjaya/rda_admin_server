const loginInfo=require("../models/login_info");
const personalInfo = require("../models/personal_info");
const superAdmin = require("../models/super_admin");

exports.listPersonalInfo = (req,res) => {
    personalInfo.find({},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
          console.log(info);
          res.status(200).json(info);
    });
};


exports.listPendingUsers = (req,res) => {
    personalInfo.find({status : "pending"},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200).json(info);
        }
    });
};

exports.createUser = (req,res) => {
    var generatedUid=555;
    console.log(req.body);
    let user = new personalInfo({
        email : req.body.email,
        uid : generatedUid,//generate
        telephone : req.body.telephone,
        fname : req.body.fname,
        lname : req.body.lname,
        category : req.body.category,
        approvalStatus : "pending",
        user_type : "user"
    });
    console.log(user);
    user.save(function (err){
        if(err){
            return err;
        }
        else{
            res.status(200).json("user added successfully");
        }
    })

    
};