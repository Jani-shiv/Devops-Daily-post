const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (DB_DIALECT === 'postgres') {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'devops_diary',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );
} else {
  // SQLite — zero install, works anywhere
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'data', 'devops_diary.sqlite'),
    logging: false,
  });
}

module.exports = sequelize;
