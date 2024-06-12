import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">My Hotel</Link>
      </h1>
      <ul>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          <Link to="/reservations">Reservations</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
