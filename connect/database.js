const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize('jumiadatabase', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define paths to models and migrations directories
// const modelsPath = path.join(__dirname, 'models');
// const migrationsPath = path.join(__dirname, 'migrations');

// // Load models dynamically
// const fs = require('fs');
// fs.readdirSync(modelsPath).forEach(file => {
//   const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
//   sequelize[model.name] = model;
// });

// // Apply migrations
// sequelize.sync({ migrationStoragePath: migrationsPath });

module.exports = sequelize;
