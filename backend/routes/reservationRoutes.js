const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, reservationController.getAllReservations);
router.get("/:id", authMiddleware, reservationController.getReservation);
router.post("/", authMiddleware, reservationController.createReservation);
router.patch("/:id", authMiddleware, reservationController.cancelReservation);

module.exports = router;
