const loginInfo=require("../models/login_info");
const personalInfo = require("../models/personal_info");
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

//const superAdmin = require("../models/super_admin");



exports.listPersonalInfo = (req,res) => {
    personalInfo.find({},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
          else{
            let msg = {
                success : true,
                msg : info
            }
                res.status(200).json(msg);
        }
    });
};

exports.listUserInfo = (req,res) => {
    personalInfo.find({uid:req.body.uid},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
          let msg = {
            success : true,
            msg : info
        }
            res.status(200).json(msg);
        }
    });
};

exports.listPendingUsers = (req,res) => {
    console.log("pending called");
    personalInfo.find({approvalStatus : "pending"},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            console.log(msg)
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : info
            }
            console.log(msg)
            res.status(200).json(msg);
        }
    });
};

exports.listApprovedUsers = (req,res) => {
    personalInfo.find({approvalStatus : "approved"},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : info
            }
            res.status(200).json(msg);
        }
    });
};

exports.listRejectedUsers = (req,res) => {
    personalInfo.find({approvalStatus : "rejected"},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : info
            }
            res.status(200).json(msg);
        }
    });
};

//If admin,send user_type as admin. If user,send user_type as user
exports.createUser = (req,res) => {
    var generatedUid=uuidv1();

    //save to personal info document
    let user = new personalInfo({
        email : req.body.email,
        uid : generatedUid,
        telephone : req.body.telephone,
        name : req.body.name,
        category : req.body.category,
        approvalStatus : "pending",
        user_type : req.body.user_type
    });
    user.save(function (err){
        if(err){
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
        }
        else{
            //save to login details
            var password = req.body.password;
            const saltRounds = 10;
            
            console.log(password);
            bcrypt.hash(password, saltRounds).then(function(hash) {
                let user_login = new loginInfo({
                    email : req.body.email,
                    uid : generatedUid,
                    password :hash,
                    approvalStatus : "pending",
                    user_type : req.body.user_type
                });
        
                user_login.save(function (err){
                    if(err){
                        let msg = {
                            success : false,
                            msg : err
                        }
                        res.status(500).json(msg);
                    }
                    else{
                        let msg = {
                            success : true,
                            msg : "success"
                        }
                        res.status(200).json(msg);
                    }
                });
            });

           

            
        }
    });

    
};

exports.approveUser = (req,res)=> {
    personalInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "approved"},{new : true},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : "success"
            }
            res.status(200).json(msg);
        }
    });

    loginInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "approved"},{new : true},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : "success"
            }
            res.status(200).json(msg);
        }
    });
};

exports.rejectUser = (req,res)=> {
    personalInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "rejected"},{new : true},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : "success"
            }
            res.status(200).json(msg);
        }
    });

    loginInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "rejected"},{new : true},(err,info)=>{
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
          }
        else{
            let msg = {
                success : true,
                msg : "success"
            }
            res.status(200).json(msg);
        }
    });
};

exports.deleteUser = (req, res) => {
    personalInfo.remove({ uid: req.body.uid }, (err, info) => {
      if (err) {
        let msg = {
            success : false,
            msg : err
        }
        res.status(404).json(msg);
      }
      else{
        let msg = {
            success : true,
            msg : "success"
        }
        res.status(200).json(msg);
      }
    });

    loginInfo.remove({ uid: req.body.uid }, (err, info) => {
        if (err) {
            let msg = {
                success : false,
                msg : err
            }
            res.status(404).json(msg);
        }
        else{
            let msg = {
                success : true,
                msg : "success"
            }
            res.status(200).json(msg);
        }
      });
  };