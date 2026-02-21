const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models'); // load associations

// Route imports
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const topicRoutes = require('./routes/topics');
const postRoutes = require('./routes/posts');
const trackerRoutes = require('./routes/tracker');
const progressRoutes = require('./routes/progress');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/progress', progressRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: false });
    console.log('✅ Models synced');

    // Auto-seed topics if empty
    const { Topic } = require('./models');
    const topicCount = await Topic.count();
    if (topicCount === 0) {
      const { topics } = require('./seeds/topics');
      await Topic.bulkCreate(topics);
      console.log(`🌱 Seeded ${topics.length} topics`);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Daily DevOps Diary API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
