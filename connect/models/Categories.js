const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "category" },
  { timestamps: true }
);

module.exports = Category;
