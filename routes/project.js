const express = require('express');
const router = express.Router();
const Projects = require('../controllers/ProjectController.js');
const passport = require('passport');

router.post('/createMainProject', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const projectName = req.body.projectName;
    if (projectName !== undefined){
        Projects.createMainProject(projectName, (err,msg) => {
            if(err){
                return res.json({
                    success:false,
                    msg:err
                });
            } else {
                return res.json({
                    success:true,
                    msg:msg
                });
            }
        })
    } else {
        return res.json({
            success:false,
            msg:'projectName is undefined'
        });
    }
});

router.get('/getProjectInfo', passport.authenticate('jwt', { session: false}), (req, res) => {
    const projectId = req.query.projectId;
    if (projectId !== undefined){
        Projects.getProjectInfoById(projectId, (err, success) => {
            if (err){
                return res.json({
                    success: false,
                    msg: err
                });
            } else {
                return res.json({
                    success: true,
                    msg: success
                })
            }
        })
    } else {
        return res.json({
            success: false,
            msg: 'projectId is undefined'
        })
    }
})

router.post('/createProject',passport.authenticate('jwt', { session: false }), (req,res)=>{
    const projectName = req.body.projectName;
    const division = req.body.division;
    const landUser = req.body.landUser;
    const lotId = req.body.lotNo;
    const mainProjectName = req.body.mainProjectName;
    if (projectName != undefined && division != undefined && landUser != undefined && lotId != undefined && mainProjectName != undefined){
        Projects.createProject(projectName,division,landUser, mainProjectName, lotId,(err, success)=>{
            if (err){
                return res.json({
                    success:false,
                    msg:err
                });
            } else {
                return res.json({
                    success:true,
                    msg:"created database entry"
                })
            }
        });
    } else {
        console.log(req.body)
        return res.json({
            success:false,
            msg:"some parameters were empty"
        })
    }
});

router.get('/stateById', passport.authenticate('jwt', { session: false }), (req, res) => {
    const projectId = req.query.projectId;
    Projects.getProjectStateById(projectId, (err, msg)=>{
        if (err){
            return res.json({
                success: false,
                msg: err
            });
        } else {
            return res.json({
                success:true,
                msg:msg
            })
        }
    })
});

router.get('/stageTransitions', passport.authenticate('jwt', { session: false }), (res, req) => {
    const stage = req.query.stage;
    if(stage !== undefined){

    } else {
        return res.json({
            success:false,
            msg:'stage is undefined'
        })
    }
})

router.get('/stageInfo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const stage = req.query.stage;
    if (stage !== undefined){
        Projects.getStageInfo(stage, (err, msg)=>{
            if (err){
                return res.json({
                    success: false,
                    msg: err
                });
            } else {
                return res.json({
                    success:true,
                    msg:msg
                })
            }
        });
    } else {
        return res.json({
            success: false,
            msg: 'stage is undefined'
        });
    }    
});

router.get('/nextStageById', passport.authenticate('jwt', { session: false }), (req, res) => {
    const projectId = req.query.projectId;
    if(projectId !== undefined){
        Projects.findNextStage(projectId, (err, msg) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err
                });
            } else {
                return res.json({
                    success: true,
                    msg:msg
                });
            }
        });
    } else {
        return res.json({
            success: false,
            msg: 'projectId is undefined'
        });
    }
});

router.get('/search', passport.authenticate('jwt', { session: false }), (req, res)=> {
    const projectName = req.query.projectName;
    const division = req.query.division;
    const landUser = req.query.landUser;
    const lotId = req.query.lotId;
    const state = req.query.state;
    const mainProjectName = req.query.mainProjectName;
    Projects.search(projectName, division, landUser, lotId, state, mainProjectName,(err, success)=> {
        if (err){
            return res.json({
                success:false,
                msg:err
            });
        } else {
            return res.json({
                success:true,
                msg:success
            })
        }
    })
})

router.post('/sendToNextStage', passport.authenticate('jwt', { session: false }), (req,res)=> {
    const projectId = req.body.projectId;
    const nextStage = req.body.nextStage;
    if (projectId == undefined){
        return res.json({
            success:false,
            msg:"projectId is undefinec"
        });
    } else {
        Projects.sendToNextStage(projectId, nextStage, (err, success)=>{
            if (err){
                return res.json({
                    success: false,
                    msg:err
                })
            } else {
                return res.json({
                    success: true,
                    msg:"Project moved to next stage"
                });
            }
        });
    }
});

module.exports = router;