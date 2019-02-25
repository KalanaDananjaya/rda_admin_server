const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectInfo = new Schema({
    projectId: {
        type: String,
        required: true,
        unique:true
    },
    projectName: {
        type: String,
        required: true
    },
    mainProjectName: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    landUser: {
        type: String,
        required:true
    },
    lotId: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("project_info", projectInfo);