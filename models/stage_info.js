const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageInfo = new Schema({
    stage: {
        type: String,
        required: true,
        unique: true
    },
    permission: {
        type: String,
        required: true
    },
    option: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('stage_info', stageInfo, 'stage_info');