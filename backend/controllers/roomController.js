const Room = require("../models/room");

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById({ _id: id });

    if (!room) return res.status(404).json({ error: "No room found" });

    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRooms, getRoom };
