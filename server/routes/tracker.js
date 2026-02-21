const express = require('express');
const { Op } = require('sequelize');
const auth = require('../middleware/auth');
const { DailyPost, Topic } = require('../models');

const router = express.Router();

// GET /api/tracker/calendar — 30-day calendar data
router.get('/calendar', auth, async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29); // inclusive 30 days

    const posts = await DailyPost.findAll({
      where: {
        user_id: req.userId,
        post_date: {
          [Op.between]: [
            thirtyDaysAgo.toISOString().split('T')[0],
            today.toISOString().split('T')[0],
          ],
        },
      },
      include: [{ model: Topic, as: 'topic', attributes: ['id', 'title', 'category', 'difficulty'] }],
      order: [['post_date', 'ASC']],
    });

    // Calculate streak
    let streak = 0;
    const postDates = new Set(posts.filter(p => p.status === 'Posted').map(p => p.post_date));
    const checkDate = new Date(today);

    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (postDates.has(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Build 30-day calendar array
    const calendar = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(thirtyDaysAgo.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const post = posts.find(p => p.post_date === dateStr);

      calendar.push({
        date: dateStr,
        topic: post?.topic?.title || null,
        category: post?.topic?.category || null,
        status: post?.status || null,
        platform: post?.platform || null,
        likes: post?.likes || 0,
        comments: post?.comments || 0,
        shares: post?.shares || 0,
      });
    }

    // Total engagement
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
    const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);
    const totalShares = posts.reduce((sum, p) => sum + (p.shares || 0), 0);

    res.json({
      streak,
      calendar,
      totalEngagement: { likes: totalLikes, comments: totalComments, shares: totalShares },
      postsThisMonth: posts.length,
    });
  } catch (err) {
    console.error('Tracker error:', err);
    res.status(500).json({ error: 'Failed to get tracker data.' });
  }
});

module.exports = router;
