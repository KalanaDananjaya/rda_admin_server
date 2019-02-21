const express = require('express');
const router = express.Router();
const Projects = require('../controllers/ProjectController.js');

router.post('/createProject',(req,res)=>{
    const projectName = req.body.projectName;
    const division = req.body.division;
    const landUser = req.body.landUser;
    const lotId = req.body.lotNo;
    if (projectName != undefined && division != undefined && landUser != undefined && lotId != undefined){
        Projects.createProject(projectName,division,landUser,lotId,(err, success)=>{
            if (err){
                res.json({
                    success:false,
                    msg:err
                });
            } else {
                res.json({
                    success:true,
                    msg:"created database entry"
                })
            }
        });
    } else {
        res.json({
            success:false,
            msg:"some parameters were empty"
        })
    }
});

module.exports = router;