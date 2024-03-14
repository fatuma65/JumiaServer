const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

const Rating = sequelize.define(
  "rating",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  { tableName: "rating" },
  { timestamps: true }
);

module.exports = Rating;
