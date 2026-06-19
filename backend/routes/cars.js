// backend/routes/cars.js
const express = require('express');
const router = express.Router();

// Try to load Mongoose model; fall back to static data if not present
let Car;
try {
  Car = require('../models/Car');
} catch (_) {
  Car = { find: () => Promise.resolve(require('../data/cars')) };
}

// GET /api/cars – optional query filters: brand, minPrice, maxPrice
router.get('/', async (req, res) => {
  try {
    const { brand, minPrice, maxPrice } = req.query;
    let cars = await Car.find();

    if (brand && brand !== 'All') {
      cars = cars.filter(c => c.brand === brand);
    }
    if (minPrice) {
      const min = Number(minPrice);
      cars = cars.filter(c => Number(c.price.replace(/[^0-9.-]+/g, '')) >= min);
    }
    if (maxPrice) {
      const max = Number(maxPrice);
      cars = cars.filter(c => Number(c.price.replace(/[^0-9.-]+/g, '')) <= max);
    }
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/cars/:id – single car details
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const carList = await Car.find();
    const car = carList.find(c => c.id === id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
