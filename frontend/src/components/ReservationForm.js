import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/api/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) return navigate("/");
    });
  });

  return (
    <div>
      <form>
        <input type="date" name="check-in" id="check-in" />
        <input type="date" name="check-out" id="check-out" />
      </form>
    </div>
  );
};

export default ReservationForm;
