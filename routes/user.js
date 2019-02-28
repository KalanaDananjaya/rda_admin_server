const express = require('express');
const router = express.Router();
const Users = require('../controllers/userController.js');
const passport = require('passport');



router.post('/getAllUsers',(req,res)=>{
    return Users.listPersonalInfo(req,res);
});

router.get('/getUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.listUserInfo(req,res);
});

router.post('/createUser',(req,res)=>{
    return Users.createUser(req,res);
});

router.get('/pendingUsers',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.listPendingUsers(req,res);
});

router.get('/approvedUsers',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.listApprovedUsers(req,res);
});

router.get('/rejectedUsers',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.listRejectedUsers(req,res);
});

router.post('/approveUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.approveUser(req,res);
});

router.post('/rejectUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.rejectUser(req,res);
});

router.post('/deleteUser',passport.authenticate('jwt', { session: false }),(req,res)=>{
    return Users.approveUser(req,res);
});

module.exports = router;