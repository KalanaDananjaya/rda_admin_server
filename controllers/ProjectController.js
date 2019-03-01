const projectInfo = require('../models/project_info');
const nextStage = require('../models/next_stage');

const uuid = require('uuid/v1');

exports.getProjectStateById = (projectId, callback) => {
    projectInfo.find({projectId:projectId}, (err, docs) => {
        if (err) {
            return callback(err, null);
        } else {
            const doc = docs[0];
            if (doc){
                return callback(null, doc.state);
            } else {
                return callback('invalid projectId',null);
            }
        }
    })
}

//todo: save the created by UID

exports.createProject = (projectName, division, landuser, mainProjectName,lotId,callback) => {
    const projectId = uuid();
    let project = {
        projectName:projectName,
        division:division,
        landUser:landuser,
        mainProjectName: mainProjectName,
        lotId:lotId        
    };
    // check if project exists
    projectInfo.find(project, (err, docs)=> {
        if (docs.length){
            // project with these meta data already exists
            callback('duplicate entry',null)
        } else {
            project.projectId = projectId;
            project.state = "Declaration of Sec. 5";
            const project_doc = new projectInfo(project)
            project_doc.save(err => {
                if (err){
                    return callback(err,null)
                } else {
                    return callback(null, {
                        success:true
                    });
                }
            });
        }
    });    
}

exports.sendToNextStage = (projectId, nextStage, callback) => {
    if(nextStage == undefined){
        getNextStage(projectId, (err, success)=> {
            if (err){
                return callback(err, null)
            } else {
                nextStage = success;
                projectInfo.findOneAndUpdate({projectId:projectId},{state:nextStage},(err,doc,res)=>{
                    if(err){
                        return callback(err, null);
                    } else {
                        return callback(null, true);
                    }
                });
            }
        })
    } else {
        projectInfo.findOneAndUpdate({projectId:projectId},{state:nextStage},(err,doc,res)=>{
            if(err){
                return callback(err, null);
            } else {
                return callback(null, true);
            }
        });
    }
}

exports.search = (projectName, division, landUser, lotId, state, callback) => {
    serachObject = createSearchObject(projectName, division, landUser, lotId, state)
    projectInfo.find(serachObject, (err, docs)=>{
        if (err){
            return callback(err, null);
        } else {
            return callback(null, docs);
        }
    })
}

function createSearchObject(projectName, division, landUser, lotId, state){
    serachObject = {}
    if (projectName !== undefined){
        serachObject.projectName = {$regex:`${projectName}.*`,$options: 'i'}
    }
    if (division !== undefined){
        serachObject.division = {$regex:`${division}.*`, $options: 'i'}
    }
    if (landUser !== undefined){
        serachObject.landUser = {$regex:`${landUser}.*`, $options: 'i'}
    }
    if (lotId !== undefined){
        serachObject.lotId = {$regex:`${lotId}.*`, $options: 'i'}
    }
    if (state !== undefined){
        serachObject.state = {$regex:`${state}.*`, $options: 'i'}
    }
    return serachObject
}

function getNextStage(projectId,callback) {
    projectInfo.find({projectId:projectId},(err, docs)=>{
        if(err) {
            return callback(err,null)
        } else {
            doc = docs[0]
            currentState = doc['state']
            nextStage.find({current:currentState}, (err,docs) => {
                if (err){
                    return callback(err, null)
                } else {
                    if (docs.length === 0) {
                        return callback("next stage is unknown",null)
                    } else {
                        doc = docs[0]
                        next = doc.next;
                        return callback(null, next)
                    }
                }
            });
        }
    });
}