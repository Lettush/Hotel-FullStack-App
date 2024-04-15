const Room = require("../models/room");

const createRoom = async (req, res) => {
  const { name, description, pricePerNight, availability } = req.body;
  try {
    res.status(200).json({ message: "Created Room" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById({ _id: id });

    if (!room) return res.status(404).json({ error: "No room found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllRooms, getRoom, createRoom };
