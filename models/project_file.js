const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectFile = new Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    fileIds: {
        type: [String]
    }
});

module.exports = mongoose.model("project_file",projectFile);