const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentInfo = new Schema({
    projectId: {
        type: String,
        unique: true,
        required: true
    },
    payment: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('payment_info', paymentInfo);