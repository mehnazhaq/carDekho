import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="app-header" style={headerStyle}>
      <nav className="nav-links" style={navStyle}>
        <Link to="/" className="nav-brand" style={brandStyle}>CarDekho</Link>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/cars" style={linkStyle}>Cars</Link>
        <Link to="/wishlist" style={linkStyle}>Wishlist</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// Simple inline style objects for a premium look – replace with CSS if preferred
const headerStyle = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  padding: "1rem 2rem",
  borderBottom: "1px solid rgba(255,255,255,0.2)"
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem"
};

const brandStyle = {
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#111",
  textDecoration: "none"
};

const linkStyle = {
  color: "#111",
  textDecoration: "none",
  fontSize: "1rem"
};

const buttonStyle = {
  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  cursor: "pointer"
};

export default Header;
