const loginInfo=require("../models/login_info");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "Asdad73@fds";



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
        let uid = user.uid;
        let hash = user.password;
            bcrypt.compare(loginPassword, hash).then(function(response) {
                if (response==true){
                    jwt.sign({uid}, secret, { expiresIn: '5h' },(err, token) => {
                        if(err) { 
                            let msg = {
                                success : false,
                                msg : err
                            }
                            res.status(401).json(msg);
                        }    
                        else{

                            let msg = {
                                success : true,
                                msg : [uid,token]
                            }
                            res.status(200).json(msg);
                        }
                        
                    });
                    
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

 exports.verifyUser = (req,res)=> {
    jwt.verify(req.body.token, secret, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            let msg = {
                success : false,
                msg : "forbidden",err
            }
            res.status(403).json(msg);
            
        } else {
            //If token is successfully verified, we can send the autorized data 
            let msg = {
                success : true,
                msg : authorizedData
            }
            res.status(200).json(msg);
            
        }
    });
}

 