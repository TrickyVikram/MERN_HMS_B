const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // Path to your controller

// Route to create a new room
router.post('/create', roomController.createRoom);

// Route to get all rooms
router.get('/', roomController.getAllRooms);

// Route to add an occupant to a room
router.put('/:roomId/add-occupant', roomController.addOccupant);

// Route to remove an occupant from a room
router.put('/:roomId/remove-occupant', roomController.removeOccupant);

module.exports = router;
