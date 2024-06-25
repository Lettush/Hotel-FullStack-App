import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/ReservationForm.css";

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/api/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) return navigate("/");
        return response.json();
      })
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, []);

  const reserveRoom = async (e) => {
    e.preventDefault();

    if (checkIn === "") return console.error("Check In is empty!");
    if (checkOut === "") return console.error("Check Out is empty!");

    setLoading(true);
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/reservations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: room._id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
          throw new Error(data.error);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Setting today
  let today = new Date();
  let [dd, mm, yyyy] = [
    today.getDate(),
    today.getMonth() + 1,
    today.getFullYear(),
  ];

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="reservation-form">
      <form>
        <h2>Reservation Form</h2>
        <div>
          <label htmlFor="check-in">Check-In Date</label>
          <input
            type="date"
            name="check-in"
            id="check-in"
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value);
            }}
          />

          <label htmlFor="check-out">Check-Out Date</label>
          <input
            type="date"
            name="check-out"
            id="check-out"
            min={checkIn ? checkIn : today}
            onChange={(e) => {
              setCheckOut(e.target.value);
            }}
          />
        </div>
        <button type="submit" onClick={reserveRoom}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
