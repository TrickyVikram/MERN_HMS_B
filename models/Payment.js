const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Add other payment fields here
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
