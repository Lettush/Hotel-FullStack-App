import { useState } from "react";
import { useParams } from "react-router-dom";

const ReservationForm = () => {
  const { id } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create reservation on the server
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: id,
          checkInDate,
          checkOutDate,
          paymentMethodId,
        }),
      });

      if (response.ok) {
        console.log("Reservation created successfully");
        // Handle successful reservation (e.g., redirect, show success message)
      } else {
        console.error("Error creating reservation:", response.statusText);
        // Handle error creating reservation (e.g., show error message)
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error creating reservation (e.g., show error message)
    }
  };

  return (
    <div className="container">
      <h1>Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="checkInDate" className="form-label">
            Check-In Date
          </label>
          <input
            type="date"
            className="form-control"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkOutDate" className="form-label">
            Check-Out Date
          </label>
          <input
            type="date"
            className="form-control"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethodId" className="form-label">
            Payment Method ID
          </label>
          <input
            type="text"
            className="form-control"
            id="paymentMethodId"
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reserve
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
