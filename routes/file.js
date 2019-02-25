const express = require('express');
const router = express.Router();
const Files = require('../controllers/fileController.js');

router.post('/uploadFile',(req,res) => {
    const projectId = req.body.projectId;
    const file = req.files.file; // name of the field for file upload is file
    const uid = req.body.uid;
    if (Object.keys(req.files).length === 0 || projectId === undefined) {
        return res.json({
            sucess:false,
            msg:"Project ID and/or file is empty"
        });
    } else {
        Files.uploadFile(projectId,file,uid, (err, success) =>{
            if (err){
                return res.json({
                    success: false,
                    msg: err
                });
            } else {
                return res.json({
                    success: true,
                    msg:success
                });
            }
        });        
    }
});

router.get('/projectFiles', (req,res) => {
    const projectId = req.query.projectId;
    if(projectId === undefined){
        return res.json({
            success: false,
            msg: "project Id is undefined"
        });
    } else {
        Files.getProjectFiles(projectId,(err, success)=>{
            if (err) {
                return res.json({
                    success: false,
                    msg: err
                });
            } else {
                return res.json({
                    success: true,
                    msg: success
                });
            }
        });
    }
});

//todo: create link to get list of fileIds
//todo: create link to get file info given file Id
//todo: given fileID get the file

module.exports = router;