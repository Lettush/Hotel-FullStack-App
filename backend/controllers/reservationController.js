const Reservation = require("../models/reservation");
const Room = require("../models/room");
const jwt = require("jsonwebtoken");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Get All Reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Specific Reservation
const getReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById({ _id: id });

    if (!reservation)
      return res.status(404).json({ error: "No reservation found." });

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create Reservation
const createReservation = async (req, res) => {
  try {
    // , paymentMethodId
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Get room details from the database
    const room = await Room.findByIdAndUpdate(
      { _id: roomId },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({ error: "No room found." });
    }

    // Calculate the total amount based on the number of nights
    const numberOfNights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalAmount = numberOfNights * room.pricePerNight;

    // Get User From Token
    const token = req.header("Authorization");
    const user = jwt.verify(token.substring(7), process.env.JWT_SECRET).userId;

    // Create a Stripe payment intent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: totalAmount,
    //   currency: "usd",
    //   payment_method: paymentMethodId,
    //   confirmation_method: "manual",
    //   confirm: true,
    // });

    // Create a reservation
    const reservation = new Reservation({
      roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
      // paymentIntentId: paymentIntent.id,
      paymentIntentId: "Paid",
      canceled: false,
      user,
    });
    await reservation.save();

    res.status(201).json({ message: "Reservation created successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      { _id: id },
      { canceled: true },
      { new: true, runValidators: true }
    );

    if (!reservation)
      return res.status(404).json({ error: "No reservation found." });

    res.status(200).json({
      message: "The reservation has been canceled.",
      reservation: reservation,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservation,
  cancelReservation,
};
