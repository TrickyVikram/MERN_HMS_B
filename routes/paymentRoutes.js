const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Add a payment
router.post('/', paymentController.addPayment);

// Get all payments for a student
router.get('/:studentId', paymentController.getPaymentsByStudent);

module.exports = router;
