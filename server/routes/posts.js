const express = require('express');
const { Op } = require('sequelize');
const auth = require('../middleware/auth');
const { DailyPost, Topic, UserProgress } = require('../models');
const { generatePost } = require('../services/postGenerator');

const router = express.Router();

// POST /api/posts/generate — generate full post content for a topic
router.post('/generate', auth, async (req, res) => {
  try {
    const { topic_id } = req.body;
    if (!topic_id) return res.status(400).json({ error: 'topic_id is required.' });

    const topic = await Topic.findByPk(topic_id);
    if (!topic) return res.status(404).json({ error: 'Topic not found.' });

    const today = new Date().toISOString().split('T')[0];

    // Check if already exists for today
    let post = await DailyPost.findOne({
      where: { user_id: req.userId, post_date: today },
    });

    const generated = generatePost(topic);

    if (post) {
      // Update existing
      Object.assign(post, generated, { topic_id, status: 'Drafted' });
      await post.save();
    } else {
      // Create new
      post = await DailyPost.create({
        user_id: req.userId,
        topic_id,
        post_date: today,
        status: 'Drafted',
        ...generated,
      });
    }

    // Update progress
    await UserProgress.findOrCreate({
      where: { user_id: req.userId, category: topic.category },
      defaults: { posts_completed: 0, total_available: 0 },
    });

    const totalInCategory = await Topic.count({ where: { category: topic.category } });
    const completedInCategory = await DailyPost.count({
      where: {
        user_id: req.userId,
        status: 'Posted',
      },
      include: [{ model: Topic, as: 'topic', where: { category: topic.category }, attributes: [] }],
    });

    await UserProgress.update(
      { posts_completed: completedInCategory, total_available: totalInCategory },
      { where: { user_id: req.userId, category: topic.category } }
    );

    res.json({ post, topic });
  } catch (err) {
    console.error('Generate post error:', err);
    res.status(500).json({ error: 'Failed to generate post.' });
  }
});

// GET /api/posts — list user's posts
router.get('/', auth, async (req, res) => {
  try {
    const { from, to } = req.query;
    const where = { user_id: req.userId };

    if (from && to) {
      where.post_date = { [Op.between]: [from, to] };
    } else if (from) {
      where.post_date = { [Op.gte]: from };
    } else if (to) {
      where.post_date = { [Op.lte]: to };
    }

    const posts = await DailyPost.findAll({
      where,
      include: [{ model: Topic, as: 'topic', attributes: ['id', 'title', 'category', 'difficulty'] }],
      order: [['post_date', 'DESC']],
    });

    res.json(posts);
  } catch (err) {
    console.error('List posts error:', err);
    res.status(500).json({ error: 'Failed to get posts.' });
  }
});

// GET /api/posts/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await DailyPost.findOne({
      where: { id: req.params.id, user_id: req.userId },
      include: [{ model: Topic, as: 'topic' }],
    });
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/posts/:id — update status / engagement
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await DailyPost.findOne({
      where: { id: req.params.id, user_id: req.userId },
      include: [{ model: Topic, as: 'topic' }],
    });
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    const { status, platform, likes, comments, shares } = req.body;
    if (status) post.status = status;
    if (platform) post.platform = platform;
    if (likes !== undefined) post.likes = likes;
    if (comments !== undefined) post.comments = comments;
    if (shares !== undefined) post.shares = shares;

    await post.save();

    // Update progress when status changes to Posted
    if (status === 'Posted' && post.topic) {
      const totalInCategory = await Topic.count({ where: { category: post.topic.category } });
      const completedInCategory = await DailyPost.count({
        where: { user_id: req.userId, status: 'Posted' },
        include: [{ model: Topic, as: 'topic', where: { category: post.topic.category }, attributes: [] }],
      });

      await UserProgress.upsert({
        user_id: req.userId,
        category: post.topic.category,
        posts_completed: completedInCategory,
        total_available: totalInCategory,
      });
    }

    res.json(post);
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Failed to update post.' });
  }
});

module.exports = router;
