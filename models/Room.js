const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  roomType: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC'], // Only AC or Non-AC allowed
  },
  bedType: {
    type: String,
    required: true,
    enum: ['Single', 'Double'], // Only Single or Double allowed
  }
});

// Method to add an occupant, ensuring it does not exceed capacity
roomSchema.methods.addOccupant = function () {
  if (this.currentOccupancy < this.capacity) {
    this.currentOccupancy += 1;
    return this.save();
  } else {
    throw new Error('Room capacity reached');
  }
};

// Method to remove an occupant, ensuring it does not go below 0
roomSchema.methods.removeOccupant = function () {
  if (this.currentOccupancy > 0) {
    this.currentOccupancy -= 1;
    return this.save();
  } else {
    throw new Error('No occupants to remove');
  }
};

module.exports = mongoose.model('Room', roomSchema);
