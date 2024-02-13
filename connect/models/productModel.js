const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true},
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
  // { tableName: "Products" }
);

module.exports = Product;

// size: { type: DataTypes.ARRAY(DataTypes.STRING) },
// color: { type: DataTypes.ARRAY(DataTypes.STRING) },
// inStock: { type: Sequelize.BOOLEAN, defaultValue: true },
// category: { type: DataTypes.ARRAY(DataTypes.STRING) },
