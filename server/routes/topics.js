const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const auth = require('../middleware/auth');
const { Topic, DailyPost } = require('../models');

const router = express.Router();

// GET /api/topics/daily — get today's unique topic (no repeat in 30 days)
router.get('/daily', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Check if user already has a topic for today
    const existingPost = await DailyPost.findOne({
      where: { user_id: req.userId, post_date: today },
      include: [{ model: Topic, as: 'topic' }],
    });

    if (existingPost) {
      return res.json({ topic: existingPost.topic, post: existingPost });
    }

    // Get topics used in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentPosts = await DailyPost.findAll({
      where: {
        user_id: req.userId,
        post_date: { [Op.gte]: thirtyDaysAgo.toISOString().split('T')[0] },
      },
      attributes: ['topic_id'],
    });

    const usedTopicIds = recentPosts.map((p) => p.topic_id);

    // Find a topic not used in 30 days
    const whereClause = { is_active: true };
    if (usedTopicIds.length > 0) {
      whereClause.id = { [Op.notIn]: usedTopicIds };
    }

    const topic = await Topic.findOne({
      where: whereClause,
      order: sequelize.literal('RANDOM()'),
    });

    if (!topic) {
      // All topics used recently — pick the oldest used one
      const oldestPost = await DailyPost.findOne({
        where: { user_id: req.userId },
        order: [['post_date', 'ASC']],
      });
      const fallbackTopic = oldestPost
        ? await Topic.findByPk(oldestPost.topic_id)
        : await Topic.findOne({ where: { is_active: true } });

      return res.json({ topic: fallbackTopic, post: null });
    }

    res.json({ topic, post: null });
  } catch (err) {
    console.error('Daily topic error:', err);
    res.status(500).json({ error: 'Failed to get daily topic.' });
  }
});

module.exports = router;
