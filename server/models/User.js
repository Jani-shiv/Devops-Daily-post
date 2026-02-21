const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  brand_name: {
    type: DataTypes.STRING(100),
    defaultValue: '',
  },
  platforms: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  skill_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'Beginner',
    validate: {
      isIn: [['Beginner', 'Intermediate', 'Advanced']],
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = User;
