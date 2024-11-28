// controllers/adminController.js
const Student = require('../models/Student');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');



// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email  , role: admin.role},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin instance
    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Example: Get all students (Admin can view all students)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Get all students from the database
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Example: Get all rooms (Admin can view all rooms)
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find(); // Get all rooms from the database
    res.json({ rooms });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Example: Add a new room (Admin can add rooms to the hostel)
exports.addRoom = async (req, res) => {
  const { roomNumber, roomType, capacity } = req.body;
  try {
    const newRoom = new Room({
      roomNumber,
      roomType,
      capacity,
    });
    await newRoom.save(); // Save the new room to the database
    res.status(201).json({ message: 'Room added successfully', room: newRoom });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Example: Approve or reject booking (Admin can manage student bookings)
exports.manageBooking = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findById(bookingId); // Find the booking by ID
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Update booking status
    booking.status = status;
    await booking.save(); // Save updated booking status
    
    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Example: Delete a student (Admin can delete a student's data)
exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndDelete(studentId); // Delete student by ID
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
