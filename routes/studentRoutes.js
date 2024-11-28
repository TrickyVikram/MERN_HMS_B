// routes/studentRoutes.js
const express = require('express');
const router = express.Router();

// Example route handler
router.get('/', (req, res) => {
  res.json({ message: "Students route" });
});

module.exports = router;

