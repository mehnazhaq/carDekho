import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cars } from '../data/cars';
import axios from 'axios';

const CarDetails = () => {
  const { id } = useParams();
  const car = cars.find((c) => String(c.id) === id);
  const addToWishlist = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/user/wishlist`,
          { carId: car.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Added to wishlist!');
      } catch (err) {
        console.error('Error adding to DB wishlist:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          alert('Session expired or invalid. Please login again to save to DB.');
        } else {
          alert('Failed to add to DB wishlist. Check console for details.');
        }
      }
    } else {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.includes(car.id)) {
        wishlist.push(car.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Added to local wishlist (Please login to save to profile)!');
      } else {
        alert('Already in local wishlist.');
      }
    }
  };
  if (!car) {
    return (
      <div className="page car-details" style={{ padding: '2rem' }}>
        <h2>Car not found</h2>
        <Link to="/cars" style={{ color: '#3b82f6' }}>Back to Cars</Link>
      </div>
    );
  }

  return (
    <div className="page car-details" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '2.5rem', marginBottom: '1rem' }}>{car.name}</h1>
      <img src={car.image} alt={car.name} style={{ maxWidth: '600px', width: '100%', borderRadius: '8px', marginBottom: '1.5rem', objectFit: 'cover' }} />
      <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#475569', maxWidth: '600px' }}>{car.description}</p>
      <p style={{ fontWeight: 600, fontSize: '1.5rem', marginTop: '1rem', color: '#1e293b' }}>{car.price}</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
        <button 
          onClick={addToWishlist} 
          style={{
            background: "linear-gradient(135deg, #10b981, #047857)",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "1rem",
            fontFamily: "'Inter', sans-serif",
            transition: "transform 0.2s, boxShadow 0.2s",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none"
          }}
        >
          Add to Wishlist
        </button>
        <Link 
          to="/cars" 
          style={{ 
            background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "1rem",
            fontFamily: "'Inter', sans-serif",
            transition: "transform 0.2s, boxShadow 0.2s",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none"
          }}
        >
          Back to Cars
        </Link>
      </div>
    </div>
  );
};

export default CarDetails;
