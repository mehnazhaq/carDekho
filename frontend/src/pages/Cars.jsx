import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "../data/cars";
import axios from "axios";

const Cars = () => {
  // Extract unique brands from car names (simple split by first word)
  const brands = Array.from(new Set(cars.map((c) => c.name.split(' ')[0])));

  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCars = cars.filter((c) => {
    const priceNum = Number(c.price.replace(/[^0-9.-]+/g, ""));
    const matchesBrand = selectedBrand ? c.name.startsWith(selectedBrand) : true;
    const matchesMin = minPrice ? priceNum >= Number(minPrice) : true;
    const matchesMax = maxPrice ? priceNum <= Number(maxPrice) : true;
    return matchesBrand && matchesMin && matchesMax;
  });

  const handleAddToWishlist = async (carId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/user/wishlist`,
          { carId: carId },
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
      if (!wishlist.includes(carId)) {
        wishlist.push(carId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Added to local wishlist (Please login to save to profile)!');
      } else {
        alert('Already in local wishlist.');
      }
    }
  };

  return (
    <div className="page cars-page" style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "2.5rem", marginBottom: "1rem" }}>Cars</h1>

      {/* Filter Controls */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* Brand Selector */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={filterSelectStyle}
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Price Range */}
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={filterInputStyle}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={filterInputStyle}
        />
      </div>

      <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {filteredCars.map((car) => (
          <div key={car.id} className="card" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <img src={car.image} alt={car.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{car.name}</h2>
              <p style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "1rem", color: "#1e293b" }}>{car.price}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button onClick={() => handleAddToWishlist(car.id)} style={wishlistButtonStyle}>Wishlist</button>
              <Link to={`/cars/${car.id}`} style={buttonStyle}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const buttonStyle = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  flex: 1,
  textAlign: "center",
};

const wishlistButtonStyle = {
  display: "inline-block",
  padding: "0.5rem 1rem",
  background: "linear-gradient(135deg, #10b981, #047857)",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  flex: 1,
  textAlign: "center",
};

const filterSelectStyle = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const filterInputStyle = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "120px",
};

export default Cars;
