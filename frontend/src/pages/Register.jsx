import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const headerStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: "2rem",
  marginBottom: "1.5rem",
  textAlign: "center",
  background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const labelStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  marginBottom: "0.2rem",
};

const inputStyle = {
  padding: "0.6rem 0.8rem",
  borderRadius: "0.4rem",
  border: "1px solid #ddd",
  fontFamily: "'Inter', sans-serif",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.75rem",
  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/auth/register`,
        { name, email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log("Registered:", user);
      setMessage({ type: 'success', text: 'Registration successful! Redirecting...' });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="page register-page" style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={headerStyle}>Register</h1>
      {message && (
        <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.4rem', background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle} htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <label style={labelStyle} htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <label style={labelStyle} htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Create Account</button>
      </form>
      {!isLoggedIn && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "#3b82f6" }}>Login</Link>
        </p>
      )}
    </div>
  );
};

export default Register;
