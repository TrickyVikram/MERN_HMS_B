const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { connectDB } = require('./utils/db');
const errorHandler = require('./middlewares/errorHandler');


// Import routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const studentRoutes = require('./routes/studentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());



// Connect to MongoDB
connectDB();




app.use('/api/auth', (req, res, next) => {
    console.log('Middleware before hitting authRoutes');
    next();  // This passes the control to the next middleware/route handler
}, authRoutes);


app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/payments', paymentRoutes);

// Use admin routes
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
