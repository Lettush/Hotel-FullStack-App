import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms data from the server
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container">
      <h1>Rooms</h1>
      <div className="row">
        {rooms.map((room) => (
          <div className="col-md-4 mb-4" key={room._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <p className="card-text">
                  Price per night: ${room.pricePerNight}
                </p>
                <Link to={`/rooms/${room._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
