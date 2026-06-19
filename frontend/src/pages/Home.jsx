import React from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.5rem",
  textDecoration: "none",
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  transition: "transform 0.2s",
  transform: "translateY(0)",
};

const Home = () => {
  return (
    <div className="page home-page" style={{ padding: "2rem" }}>
      <section className="hero" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "3rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to CarDekho
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Discover, compare, and find your perfect car.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/cars" style={buttonStyle}>Browse Cars</Link>
          <Link to="/smart-finder" style={buttonStyle}>Smart Finder</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
