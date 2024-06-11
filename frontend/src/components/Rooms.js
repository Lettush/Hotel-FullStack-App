import { useEffect, useState } from "react";

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
        rooms.map((room) => (
          <div>
            <h3>{room.name}</h3>
            <ul>
              <li>{room.description}</li>
              <li>${room.pricePerNight}</li>
              <li>
                {room.availability ? (
                  <span>Available</span>
                ) : (
                  <span>Unavailable</span>
                )}
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Rooms;
