const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DailyPost = sequelize.define('DailyPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hook: {
    type: DataTypes.TEXT,
  },
  explanation: {
    type: DataTypes.TEXT,
  },
  technical_breakdown: {
    type: DataTypes.TEXT,
  },
  use_case: {
    type: DataTypes.TEXT,
  },
  common_mistakes: {
    type: DataTypes.TEXT,
  },
  cta: {
    type: DataTypes.TEXT,
  },
  hashtags: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'Planned',
    validate: {
      isIn: [['Planned', 'Drafted', 'Posted']],
    },
  },
  post_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING(50),
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  shares: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'daily_posts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'post_date'],
    },
  ],
});

module.exports = DailyPost;
