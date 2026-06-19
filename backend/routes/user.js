const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Add to wishlist
router.post('/wishlist', auth, async (req, res) => {
  try {
    const { carId } = req.body;
    let user;
    try {
      user = await User.findById(req.user.id);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid user session. Please login again.' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.wishlist.includes(carId)) {
      user.wishlist.push(carId);
      await user.save();
    }

    res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get wishlist
router.get('/wishlist', auth, async (req, res) => {
  try {
    let user;
    try {
      user = await User.findById(req.user.id);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid user session. Please login again.' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Error getting wishlist:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
