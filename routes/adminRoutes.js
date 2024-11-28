
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware'); // Admin middleware to check if admin

// Admin login/register route
router.post('/login', adminController.loginAdmin);
router.post('/register', adminController.registerAdmin);
// Admin protected routes (requires authentication and admin check)
router.get('/students', authMiddleware, adminMiddleware, adminController.getAllStudents); // Get all students
router.get('/rooms', authMiddleware, adminMiddleware, adminController.getAllRooms); // Get all rooms
router.post('/rooms', authMiddleware, adminMiddleware, adminController.addRoom); // Add new room
router.post('/bookings/manage', authMiddleware, adminMiddleware, adminController.manageBooking); // Manage booking (approve/reject)
router.delete('/students/:studentId', authMiddleware, adminMiddleware, adminController.deleteStudent); // Delete student

module.exports = router;


