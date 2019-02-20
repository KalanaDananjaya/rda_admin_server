const loginInfo=require("../models/login_info");
const bcrypt = require('bcrypt');



 exports.loginUser = (req,res) =>{
    
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    const saltRounds = 10;
    
    bcrypt.hash(newPassword, saltRounds).then(function(hash) {
        /*NEED TO CREATE NEW PASSWORD HERE AND ASSIGN IT AS NEW HASH */ 
        // new_hash=hash
        });
    loginInfo.findOne({ email : req.body.email},(err,user)=>{
        if (err){
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
        }
        else{
            let hash = new_hash;
            bcrypt.compare(oldPassword, hash).then(function(response) {
                if (response==true){
                    /*Changing the password here */

                    loginInfo.findOneAndUpdate({uid:req.body.uid},{password : hash },{new : true},(err,info)=>{
                        if (err) {
                            let msg = {
                                success : false,
                                msg : err
                            }
                            res.status(400).json(msg);
                          }
                        else{
                            let msg = {
                                success : true,
                                msg : "success"
                            }
                            res.status(200).json(msg);
                        }
                    });

                    /* Finish changing the password */
                    let msg = {
                        success : true,
                        msg : "success"
                    }
                    res.status(200).json(msg);
                }

                else{
                    let msg = {
                        success : false,
                        msg : "invalid email/password"
                    }
                    res.status(401).json(msg);
                }
             });
        }
    });
 }

 