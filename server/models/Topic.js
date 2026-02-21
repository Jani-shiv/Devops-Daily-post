const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Topic = sequelize.define('Topic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['Beginner', 'Intermediate', 'Advanced']],
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'topics',
  timestamps: false,
});

module.exports = Topic;
