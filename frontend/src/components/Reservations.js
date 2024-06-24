import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './styles/Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const cancelReservation = async (id) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    await fetch(`http://localhost:4000/api/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          navigate(0);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            return navigate("/");
          }
          throw new Error(response.status);
        } else return response.json();
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
          <div key={reservation._id}  className={`appointment-card ${reservation.canceled && 'canceled'}`}>
            <ul className="appointment-details">
              <Link to={`/rooms/${reservation.roomId}`} className="room-link">Room</Link>
              <li>{reservation.checkInDate}</li>
              <li>{reservation.checkOutDate}</li>
              <li>${reservation.totalAmount}</li>
              <li>{reservation.paymentIntentId !== "" ? "Paid" : "Unpaid"}</li>
              <li>{reservation.user}</li>
              <li>
                {!reservation.canceled && (
                  <button onClick={() => cancelReservation(reservation._id)}>
                    Cancel
                  </button>
                )}
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Reservations;
