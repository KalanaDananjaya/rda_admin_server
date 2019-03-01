const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainProjectInfo = new Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("main_project_info", mainProjectInfo)