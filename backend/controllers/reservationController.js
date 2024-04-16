const Reservation = require("../models/reservation");
const Room = require("../models/room");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Reservation
const createReservation = async (req, res) => {
  try {
    // , paymentMethodId
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Get room details from the database
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Calculate the total amount based on the number of nights
    const numberOfNights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalAmount = numberOfNights * room.pricePerNight;

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
      user: req.userId,
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
      room,
    });
  } catch (error) {}
};

module.exports = { createReservation, cancelReservation };
