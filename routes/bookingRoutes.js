// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

// Example of a route handler
router.get('/', (req, res) => {
  res.json({ message: "Bookings route" });
});

// Export the router
module.exports = router;
