const express = require('express');
const auth = require('../middleware/auth');
const { User } = require('../models');

const router = express.Router();

// GET /api/profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/profile
router.put('/', auth, async (req, res) => {
  try {
    const { name, brand_name, platforms, skill_level } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (name) user.name = name;
    if (brand_name !== undefined) user.brand_name = brand_name;
    if (platforms) user.platforms = platforms;
    if (skill_level) user.skill_level = skill_level;

    await user.save();
    const { password_hash, ...safe } = user.toJSON();
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
