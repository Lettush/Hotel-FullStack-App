import { useEffect, useState } from "react";
import "./styles/Rooms.css";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/rooms")
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setRooms(data);
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
        <>
          <h2 className="page-header">Rooms</h2>
          {rooms.map((room) => (
            <Link to={`/rooms/${room._id}`} className="room-link">
              <div className="room">
                <h3>{room.name}</h3>
                <ul>
                  <li>{room.description}</li>
                  <li>${room.pricePerNight}</li>
                  {/* <li>
                  {room.availability ? (
                    <span>Available</span>
                  ) : (
                    <span>Unavailable</span>
                  )}
                </li> */}
                </ul>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Rooms;
