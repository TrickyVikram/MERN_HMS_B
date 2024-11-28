const Room = require('../models/Room'); // Path to your Room model

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, roomType, bedType } = req.body;

    // Create a new room
    const room = new Room({
      roomNumber,
      capacity,
      roomType,
      bedType,
    });

    await room.save();
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create room',
      error: error.message,
    });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rooms',
      error: error.message,
    });
  }
};

// Add an occupant to a room
exports.addOccupant = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    await room.addOccupant(); // Use the method from the Room model
    res.status(200).json({
      success: true,
      message: 'Occupant added successfully',
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add occupant',
      error: error.message,
    });
  }
};

// Remove an occupant from a room
exports.removeOccupant = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    await room.removeOccupant(); // Use the method from the Room model
    res.status(200).json({
      success: true,
      message: 'Occupant removed successfully',
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove occupant',
      error: error.message,
    });
  }
};
