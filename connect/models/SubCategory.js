const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const SubCategory = sequelize.define(
  "subCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "subCategory" },
  { timestamps: true }
);

module.exports = SubCategory;
