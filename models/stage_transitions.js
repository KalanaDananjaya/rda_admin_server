const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageTransition = new Schema({
    current: {
        type: String,
        required: true
    },
    next: {
        type:[String],
        required: true
    }
});

module.exports = mongoose.model('stage_transitions', stageTransition, 'stage_transitions');