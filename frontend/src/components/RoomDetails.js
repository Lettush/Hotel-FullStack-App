import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./styles/RoomDetails.css";

const RoomDetails = () => {
  const [room, setRoom] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/rooms/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        setRoom(data);
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
        <div className="room-details">
          <div className="room-info-container">
            <div className="room-info">
              <h3>
                {room.name}
                {room.availability ? (
                  <span className="available">Available</span>
                ) : (
                  <span>Unavailable</span>
                )}
              </h3>

              <p>{room.description}</p>

              <div>
                <span>${room.pricePerNight}</span>
                <Link to={`/reservation/${id}`}>Reserve a Room</Link>
              </div>
            </div>
          </div>
          <div className="slide-container">
            <div className="slider-wrapper">
              <div className="slider">
                <img
                  src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hotel Image 1"
                  id="slide-1"
                />
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hotel Image 2"
                  id="slide-2"
                />
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hotel Image 3"
                  id="slide-3"
                />
              </div>
              <div className="slider-nav">
                <a href="#slide-1"></a>
                <a href="#slide-2"></a>
                <a href="#slide-3"></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
