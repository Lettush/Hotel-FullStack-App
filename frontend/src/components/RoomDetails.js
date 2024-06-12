import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      )}
    </div>
  );
};

export default RoomDetails;
