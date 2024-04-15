const Reservation = require("../models/reservation");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createReservation = async (req, res, next) => {
  try {
    const { roomId, checkInDate, checkOutDate, paymentMethodId } = req.body;

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
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    // Create a reservation
    const reservation = new Reservation({
      roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
      paymentIntentId: paymentIntent.id,
      user: req.userId,
    });
    await reservation.save();

    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });;
  }
};

module.exports = { createReservation };
