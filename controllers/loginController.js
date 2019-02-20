const loginInfo=require("../models/login_info");
const bcrypt = require('bcrypt');



 exports.loginUser = (req,res) =>{
    
    let loginPassword = req.body.password;

    loginInfo.findOne({ email : req.body.email},(err,user)=>{
        if (err){
            let msg = {
                success : false,
                msg : err
            }
            res.status(500).json(msg);
        }
        else{
        let hash = user.password;
            bcrypt.compare(loginPassword, hash).then(function(response) {
                if (response==true){

                    /*create JWT here */
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

 