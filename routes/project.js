const express = require('express');
const router = express.Router();
const Projects = require('../controllers/ProjectController.js');
const passport = require('passport');

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
        return res.json({
            success:false,
            msg:"some parameters were empty"
        })
    }
});

router.get('/search', passport.authenticate('jwt', { session: false }), (req, res)=> {
    const projectName = req.body.projectName;
    const division = req.body.division;
    const landUser = req.body.landUser;
    const lotId = req.body.lotId;
    const state = req.body.state;
    Projects.search(projectName, division, landUser, lotId, state, (err, success)=> {
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