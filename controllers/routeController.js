const loginInfo=require("../models/login_info");
const personalInfo = require("../models/personal_info");
//const superAdmin = require("../models/super_admin");

const uuidv1 = require('uuid/v1');

exports.listPersonalInfo = (req,res) => {
    personalInfo.find({},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
          console.log(info);
          res.status(200).json(info);
    });
};

exports.listUserInfo = (req,res) => {
    personalInfo.find({uid:req.body.uid},(err,info)=>{
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

exports.listApprovedUsers = (req,res) => {
    personalInfo.find({status : "approved"},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200).json(info);
        }
    });
};

exports.listRejectedUsers = (req,res) => {
    personalInfo.find({status : "rejected"},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200).json(info);
        }
    });
};

//If admin,send user_type as admin. If user,send user_type as user
exports.createUser = (req,res) => {
    var generatedUid=uuidv1();

    //save to personal info document
    let user = new personalInfo({
        email : req.body.email,
        uid : generatedUid,//generate
        telephone : req.body.telephone,
        fname : req.body.fname,
        lname : req.body.lname,
        category : req.body.category,
        approvalStatus : "pending",
        user_type : req.body.user_type
    });
    user.save(function (err){
        if(err){
            return err;
        }
        else{
            res.status(200).json("user request created successfully");
        }
    });

    //save to login details
    let user_login = new loginInfo({
        email : req.body.email,
        uid : generatedUid,
        password : req.body.password,
        approvalStatus : "pending",
        user_type : req.body.user_type
    });

    user_login.save(function (err){
        if(err){
            return err;
        }
        else{
            res.status(200).json("user login info added successfully");
        }
    });
};

exports.approveUser = (req,res)=> {
    personalInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "approved"},{new : true},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200).json(info);
        }
    });

    loginInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "approved"},{new : true},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200);
        }
    });
};

exports.rejectUser = (req,res)=> {
    personalInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "rejected"},{new : true},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200).json(info);
        }
    });

    loginInfo.findOneAndUpdate({uid:req.body.uid},{approvalStatus : "rejected"},{new : true},(err,info)=>{
        if (err) {
            res.status(500).send(err);
          }
        else{
            res.status(200);
        }
    });
};

exports.deleteUser = (req, res) => {
    personalInfo.remove({ uid: req.body.uid }, (err, info) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json({ message: "User succesfully deleted" });
    });

    loginInfo.remove({ uid: req.body.uid }, (err, info) => {
        if (err) {
          res.status(404).send(err);
        }
        res.status(200);
      });
  };