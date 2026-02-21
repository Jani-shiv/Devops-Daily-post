const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  posts_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  total_available: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'user_progress',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'category'],
    },
  ],
});

module.exports = UserProgress;
