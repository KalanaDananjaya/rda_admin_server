const projectInfo = require('../models/project_info');

const uuid = require('uuid/v1');

exports.createProject = (projectName, division, landuser, lotId,callback) => {
    const projectId = uuid();
    let project = {
        projectName:projectName,
        division:division,
        landUser:landuser,
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
                    callback(err,null)
                } else {
                    callback(null, {
                        success:true
                    });
                }
            });
        }
    });    
}