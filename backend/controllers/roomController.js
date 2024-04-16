const Room = require("../models/room");

// Create Room
const createRoom = async (req, res) => {
  const { name, description, pricePerNight, availability } = req.body;
  try {
    const room = await Room.create({
      name,
      description,
      pricePerNight,
      availability,
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Specific Room
const getRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById({ _id: id });

    if (!room) return res.status(404).json({ error: "No room found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Room
const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({
        error: "No matching room found.",
      });
    }

    res.status(200).json({
      message: "The room has been successfully updated.",
      room,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete({ _id: id });

    if (!room) {
      return res.status(404).json({
        error: "No matching room found",
      });
    }

    res.status(200).json({
      message: "The room has been successfully removed.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
