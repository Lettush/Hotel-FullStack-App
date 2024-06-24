// Libraries
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Routes
import Register from "./components/Register";
import Login from "./components/Login";
import Rooms from "./components/Rooms";
import Reservations from "./components/Reservations";
import ReservationForm from "./components/ReservationForm";
import RoomDetails from "./components/RoomDetails";
import "./App.css";

function App() {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;

  return (
    <div className="main">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {token ? (
            <>
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/reservation/:id" element={<ReservationForm />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
