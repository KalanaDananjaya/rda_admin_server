const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileInfo = new Schema({
    fileId: {
        type: String,
        required: true,
        unique: true
    },
    fileName: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("file_info",fileInfo);