import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Fetch room details from the server
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/rooms/${id}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p>Price per night: ${room.pricePerNight}</p>
      <Link to={`/reservation/${room._id}`} className="btn btn-primary">
        Reserve Room
      </Link>
    </div>
  );
};

export default RoomDetails;