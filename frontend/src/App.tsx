import React from 'react';
import './App.css';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
// Page components
import Home from './pages/Home.jsx';
import Cars from './pages/Cars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import CompareCars from './pages/CompareCars.jsx';
import SmartFinder from './pages/SmartFinder.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <header className="app-header">
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cars" className="nav-link">Cars</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
          <Link to="/smart-finder" className="nav-link">Smart Finder</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </header>


      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/compare" element={<CompareCars />} />
          <Route path="/smart-finder" element={<SmartFinder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;