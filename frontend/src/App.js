import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import ReservationForm from './components/ReservationForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/reservation/:id" element={<ReservationForm />} />
      </Routes>
    </Router>
  );
};

export default App;