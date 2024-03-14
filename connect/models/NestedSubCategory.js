const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const NestedSubCategory = sequelize.define(
  "NestedSubCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "nestedSubCategory" },
  { timestamps: true }
);

module.exports = NestedSubCategory;
