const express = require('express');
const router = express.Router();
const LogIn = require('../controllers/loginController.js');
const changePw = require('../controllers/passwordController.js');
const passport = require('passport');

router.post('/',(req,res)=>{
    LogIn.loginUser(req,res);
});

/* Not important */
router.post('/verifyUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return LogIn.verifyUser(req,res);
});

router.post('/changePassword',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return changePw.changePassword(req,res);
});

module.exports = router;