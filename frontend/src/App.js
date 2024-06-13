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
import RoomDetails from "./components/RoomDetails";
import "./App.css";

function App() {
  return (
    <div className="main">
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
