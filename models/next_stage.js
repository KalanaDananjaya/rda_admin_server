const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nextStage = new Schema({
    current: {
        type: String,
        required: true
    },
    next: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("next_stage", nextStage,"next_stage")