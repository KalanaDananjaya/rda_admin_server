const express = require('express');
const router = express.Router();
const resetPw = require('../controllers/passwordResetController.js');
const passport = require('passport');

router.post('/forgotPassword',(req,res)=>{
    return resetPw.forgot_password(req,res);
});

router.post('/resetPasswordValidate',(req,res)=>{
    return resetPw.validateRstPwToken(req,res);
})

router.post('/resetPassword',(req,res)=>{
    return resetPw.reset_password(req,res);
});

module.exports = router;