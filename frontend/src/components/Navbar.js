import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav>
      <h1>
        <Link to="/">My Hotel</Link>
      </h1>
      <ul>
        {localStorage.getItem("token") ? (
          <>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <button onClick={logout}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
