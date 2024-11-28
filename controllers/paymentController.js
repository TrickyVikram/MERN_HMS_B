const Payment = require('../models/Payment');
const Student = require('../models/Student');

// Add a payment for a student
exports.addPayment = async (req, res) => {
  const { studentId, amount, paymentMethod, paymentStatus } = req.body;

  // Validate input
  if (!studentId || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new payment
    const payment = new Payment({
      studentId,
      amount,
      paymentMethod,
      paymentStatus,
    });

    // Save the payment to the database
    await payment.save();

    // Optionally, add the payment reference to the student's payments array
    const student = await Student.findById(studentId);
    student.payments.push(payment._id);
    await student.save();

    res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all payments for a student
exports.getPaymentsByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Find the student and populate their payments
    const student = await Student.findById(studentId).populate('payments');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ payments: student.payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
