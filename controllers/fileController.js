const FileInfo = require('../models/file_info');
const ProjectFiles = require('../models/project_file');
const projectInfo = require('../models/project_info')

const uuid = require('uuid/v1');

exports.uploadFile = (projectId, file, uid,callback) => {
    projectInfo.find({projectId: projectId}, (err, docs) => {
        if (err){
            callback(err, null);
        } else {
            if (docs.length == 0){
                return callback('invalid projectId', null);
            } else {
                // create file record in file-info
                const fileId = uuid();
                const file_info = {
                    fileId: fileId,
                    fileName: file.name,
                    projectId: projectId,
                    createdOn: Date.now(),
                    createdBy: uid
                }
                const file_info_doc = new FileInfo(file_info);
                file_info_doc.save().then(success => {
                    ProjectFiles.findOne({projectId:projectId},(err, doc)=> {
                        if (err){
                            return callback(err, null);
                        } else {
                            if (doc){
                                fileIds = doc.fileIds;
                            } else {
                                fileIds = []
                            }
                            options = {upsert:true}
                            fileIds.push(fileId)
                            update = {
                                fileIds:fileIds
                            }
                            ProjectFiles.findOneAndUpdate({projectId:projectId},update,options,(err, success)=>{
                                if (err){
                                    callback(err, null);
                                } else {
                                    file.mv(`./files/${fileId}.pdf`, err=> {
                                        if(err){
                                            return callback(err, null);
                                        } else {
                                            return callback(null, "File uploaded successfully");
                                        }
                                    })
                                }
                            })
                        }
                    })
                }, error => {
                    return callback(err, null);
                });
            }
        }
    })
}

exports.getProjectFiles = (projectId, callback) => {
    ProjectFiles.findOne({projectId:projectId},(err,doc)=>{
        if (err){
            return callback(err, null);
        }
        if (doc){
            return callback(null, doc.fileIds);
        } else {
            return callback(null, []);
        }
    })
}