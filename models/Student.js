const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user_id:{ type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true }, // Unique email
    age: { type: Number, },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }], // Array of payments
  },
  { timestamps: true }
);

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


