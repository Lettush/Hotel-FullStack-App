import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/api/reservations", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setReservations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        reservations.map((reservation) => (
          <div>
            <ul>
              <Link
                to={`/rooms/${reservation.roomId}`}
              >
                Room
              </Link>
              <li>{reservation.checkInDate}</li>
              <li>{reservation.checkOutDate}</li>
              <li>${reservation.totalAmount}</li>
              <li>{reservation.paymentIntentId !== "" ? "Paid" : "Unpaid"}</li>
              <li>{reservation.user}</li>
              {reservation.canceled && <li>Canceled</li>}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
