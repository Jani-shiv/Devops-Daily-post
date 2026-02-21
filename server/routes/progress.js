const express = require('express');
const auth = require('../middleware/auth');
const { UserProgress, Topic, DailyPost } = require('../models');

const router = express.Router();

const CATEGORIES = [
  'Linux',
  'Git & GitHub',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Cloud (AWS/GCP/Azure)',
  'Monitoring & Logging',
  'Interview Prep',
];

// GET /api/progress — learning progression per category
router.get('/', auth, async (req, res) => {
  try {
    const progressData = [];
    let totalCompleted = 0;
    let totalAvailable = 0;

    for (const category of CATEGORIES) {
      const total = await Topic.count({ where: { category, is_active: true } });
      const completed = await DailyPost.count({
        where: { user_id: req.userId, status: 'Posted' },
        include: [{ model: Topic, as: 'topic', where: { category }, attributes: [] }],
      });

      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      progressData.push({
        category,
        completed,
        total,
        percent,
      });

      totalCompleted += completed;
      totalAvailable += total;
    }

    const overallPercent = totalAvailable > 0 ? Math.round((totalCompleted / totalAvailable) * 100) : 0;

    res.json({
      categories: progressData,
      overall: {
        completed: totalCompleted,
        total: totalAvailable,
        percent: overallPercent,
      },
    });
  } catch (err) {
    console.error('Progress error:', err);
    res.status(500).json({ error: 'Failed to get progress data.' });
  }
});

module.exports = router;
